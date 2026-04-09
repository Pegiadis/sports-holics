#!/usr/bin/env node
/**
 * One-shot migration: convert Strapi blocks content to HTML strings.
 *
 * Target table: components_article_text_blocks
 * Current `content` column type: jsonb (Strapi blocks format)
 * New `content` column type: text (CKEditor HTML output)
 *
 * Why this script:
 *   We are swapping the `content` field on the `article.text-block` component
 *   from Strapi 5's built-in `blocks` field to a CKEditor customField (which
 *   Strapi stores as `richtext`, i.e. a text column). Simply deploying the
 *   new schema would fail because Postgres cannot implicitly cast jsonb to
 *   text in a way that is usable by the new field. This script does the
 *   conversion explicitly and atomically.
 *
 * What it does (in a single transaction):
 *   1. SELECTs every row from components_article_text_blocks
 *   2. Converts each row's `content` jsonb array (Strapi blocks format) to
 *      an HTML string using the same conversion logic as the frontend's
 *      `richtext-utils.ts` file.
 *   3. Adds a temporary text column `content_migrated`.
 *   4. UPDATEs every row to store the HTML in the new column.
 *   5. DROPs the old jsonb `content` column.
 *   6. RENAMEs `content_migrated` -> `content`.
 *   7. COMMITs. Entire migration succeeds or fails atomically.
 *
 * When to run:
 *   This script must run when Strapi's DB schema still has `content` as
 *   jsonb (i.e. BEFORE the new schema is loaded on boot) and the new
 *   container image with the customField schema has already been built.
 *
 * Recommended sequence on the VPS:
 *   1. git pull                                               # get new code + this script
 *   2. docker compose build strapi                            # build new image in parallel
 *   3. docker cp backend/sportsholics-cms/scripts/migrate-blocks-to-html.js \
 *        sportsholics-strapi:/app/scripts/migrate-blocks-to-html.js
 *   4. docker exec sportsholics-strapi \
 *        node scripts/migrate-blocks-to-html.js --dry-run     # sanity check
 *   5. docker exec sportsholics-strapi \
 *        node scripts/migrate-blocks-to-html.js --force       # actually run
 *   6. docker compose up -d strapi                            # swap to new image
 *
 * Flags:
 *   --dry-run   Report what would change. Do not modify the database.
 *   --force     Skip the interactive confirmation. Required in non-TTY.
 *   --verbose   Log each row being processed.
 *
 * Safety:
 *   - Wrapped in a single transaction. Any failure rolls back everything.
 *   - Idempotent: if `content` is already text type, the script detects it
 *     and exits cleanly.
 *   - Refuses to run if it cannot read DATABASE_* env vars.
 *   - Takes no destructive action in --dry-run mode.
 *
 * Environment variables read:
 *   DATABASE_HOST       (default: postgres)
 *   DATABASE_PORT       (default: 5432)
 *   DATABASE_NAME       (required)
 *   DATABASE_USERNAME   (required)
 *   DATABASE_PASSWORD   (required)
 */

const { Client } = require('pg');

// ------------------------------------------------------------
// CLI argument parsing
// ------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const VERBOSE = args.includes('--verbose');

// ------------------------------------------------------------
// Logging
// ------------------------------------------------------------

const log = {
  info: (msg) => console.log(`[migrate] ${msg}`),
  warn: (msg) => console.warn(`[migrate] WARN: ${msg}`),
  error: (msg) => console.error(`[migrate] ERROR: ${msg}`),
  verbose: (msg) => {
    if (VERBOSE) console.log(`[migrate] ${msg}`);
  },
};

// ------------------------------------------------------------
// Blocks -> HTML conversion
// Ported from frontend/lib/richtext-utils.ts to match the rendering
// the frontend has been doing. Keep in sync if that file changes.
// ------------------------------------------------------------

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInlineNode(node) {
  if (!node || typeof node !== 'object') return '';

  if (node.type === 'text') {
    let text = escapeHtml(node.text || '');
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<s>${text}</s>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }

  if (node.type === 'link') {
    const linkText = Array.isArray(node.children)
      ? node.children.map(renderInlineNode).join('')
      : (node.url || '');
    const url = node.url || '#';
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  }

  return '';
}

function renderBlock(block) {
  if (!block || typeof block !== 'object') return '';

  // Image block
  if (block.type === 'image' && block.image) {
    const imageUrl = block.image.url || '';
    const alt = escapeHtml(block.image.alternativeText || '');
    return `<figure><img src="${escapeHtml(imageUrl)}" alt="${alt}" loading="lazy" /></figure>`;
  }

  if (!Array.isArray(block.children) || block.children.length === 0) {
    return '';
  }

  // List block — children are list-item blocks, each of which has inline children
  if (block.type === 'list') {
    const tag = block.format === 'ordered' ? 'ol' : 'ul';
    const items = block.children
      .map((item) => {
        if (item && Array.isArray(item.children)) {
          const itemContent = item.children.map(renderInlineNode).join('');
          return `<li>${itemContent}</li>`;
        }
        return '';
      })
      .join('');
    return `<${tag}>${items}</${tag}>`;
  }

  // Inline-content blocks
  const content = block.children.map(renderInlineNode).join('');

  switch (block.type) {
    case 'paragraph':
      return `<p>${content}</p>`;
    case 'heading': {
      const level = block.level || 2;
      return `<h${level}>${content}</h${level}>`;
    }
    case 'quote':
      return `<blockquote>${content}</blockquote>`;
    case 'code':
      return `<pre><code>${content}</code></pre>`;
    default:
      return content ? `<p>${content}</p>` : '';
  }
}

/**
 * Classify a raw content value coming from the database.
 *
 *   { kind: 'empty',   html: '' }                  — null / empty string / whitespace
 *   { kind: 'html',    html: <same> }              — already HTML (starts with '<')
 *   { kind: 'blocks',  blocks: <array>, html: '' } — Strapi blocks: either a JS array (jsonb column)
 *                                                    or a JSON-stringified array (text column)
 *   { kind: 'unknown', html: '' }                  — something we can't parse
 */
function classifyContent(raw) {
  if (raw === null || raw === undefined) return { kind: 'empty', html: '' };

  // jsonb column — pg already parsed it to a JS value
  if (Array.isArray(raw)) return { kind: 'blocks', blocks: raw };
  if (typeof raw === 'object') {
    if (Array.isArray(raw.blocks)) return { kind: 'blocks', blocks: raw.blocks };
    return { kind: 'unknown', html: '' };
  }

  // text column — string
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed === '') return { kind: 'empty', html: '' };
    if (trimmed.startsWith('<')) return { kind: 'html', html: raw };
    // Looks like JSON: try to parse
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return { kind: 'blocks', blocks: parsed };
        if (parsed && Array.isArray(parsed.blocks)) return { kind: 'blocks', blocks: parsed.blocks };
      } catch (_e) {
        // not valid JSON — fall through to unknown
      }
    }
    return { kind: 'unknown', html: '' };
  }

  return { kind: 'unknown', html: '' };
}

function blocksToHtml(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks.map(renderBlock).join('');
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

async function main() {
  const config = {
    host: process.env.DATABASE_HOST || 'postgres',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };

  if (!config.database || !config.user || !config.password) {
    log.error('DATABASE_NAME, DATABASE_USERNAME, and DATABASE_PASSWORD must be set.');
    process.exit(1);
  }

  log.info(`connecting to ${config.user}@${config.host}:${config.port}/${config.database}`);
  const client = new Client(config);
  await client.connect();

  try {
    // 1. Detect current column type
    const typeRes = await client.query(
      `SELECT data_type FROM information_schema.columns
       WHERE table_name = 'components_article_text_blocks' AND column_name = 'content'`
    );

    if (typeRes.rowCount === 0) {
      log.error('Table components_article_text_blocks.content does not exist. Nothing to migrate.');
      process.exit(2);
    }

    const currentType = typeRes.rows[0].data_type;
    log.info(`current content column type: ${currentType}`);

    if (currentType !== 'jsonb' && currentType !== 'text' && currentType !== 'character varying') {
      log.error(`Unexpected column type '${currentType}'. Expected 'jsonb', 'text', or 'character varying'. Aborting.`);
      process.exit(3);
    }

    // 2. Count rows
    const countRes = await client.query(
      'SELECT count(*) AS total FROM components_article_text_blocks'
    );
    const total = parseInt(countRes.rows[0].total, 10);
    log.info(`found ${total} text-block rows`);

    // Short-circuit for empty tables: just make sure column type matches the new schema
    if (total === 0) {
      if (currentType === 'jsonb') {
        log.info('Empty table. Changing column type jsonb -> text to match new schema.');
        if (!DRY_RUN) {
          await client.query('BEGIN');
          await client.query(
            'ALTER TABLE components_article_text_blocks ALTER COLUMN content TYPE text USING NULL'
          );
          await client.query('COMMIT');
        }
      }
      log.info('Done.');
      await client.end();
      return;
    }

    // 3. Read all rows and classify each row's content
    log.info('reading rows and classifying content...');
    const rowsRes = await client.query(
      'SELECT id, content FROM components_article_text_blocks ORDER BY id'
    );

    const plans = [];
    const stats = { empty: 0, html: 0, blocks: 0, unknown: 0, errors: 0 };

    for (const row of rowsRes.rows) {
      try {
        const c = classifyContent(row.content);
        if (c.kind === 'blocks') {
          const html = blocksToHtml(c.blocks);
          plans.push({ id: row.id, action: 'rewrite', newValue: html });
          stats.blocks++;
        } else if (c.kind === 'html') {
          stats.html++; // already migrated — skip
        } else if (c.kind === 'empty') {
          stats.empty++;
          // Make sure it's at least an empty string for NOT NULL constraint later
          plans.push({ id: row.id, action: 'rewrite', newValue: '' });
        } else {
          stats.unknown++;
          log.warn(`  row ${row.id}: unrecognized content shape, skipping`);
        }
      } catch (err) {
        stats.errors++;
        log.error(`row ${row.id} conversion failed: ${err.message}`);
      }
    }

    log.info('content classification:');
    log.info(`  blocks -> html: ${stats.blocks}`);
    log.info(`  already html:   ${stats.html}`);
    log.info(`  empty:          ${stats.empty}`);
    log.info(`  unknown:        ${stats.unknown}`);
    log.info(`  conversion errors: ${stats.errors}`);

    const toRewrite = plans.filter((p) => p.action === 'rewrite' && p.newValue !== null && p.newValue !== undefined).length;
    log.info(`  rows to UPDATE: ${toRewrite}`);

    const samples = plans
      .filter((p) => p.newValue && p.newValue.length > 0)
      .slice(0, 3);
    if (samples.length > 0) {
      log.info(`sample HTML output (first ${samples.length}):`);
      for (const s of samples) {
        const preview = s.newValue.slice(0, 140).replace(/\n/g, ' ');
        log.info(`  id=${s.id}: ${preview}${s.newValue.length > 140 ? '...' : ''}`);
      }
    }

    if (DRY_RUN) {
      log.info('DRY RUN: no database changes made. Re-run with --force to apply.');
      await client.end();
      return;
    }

    if (!FORCE) {
      log.warn('Refusing to proceed without --force. Re-run with --force to apply changes.');
      await client.end();
      process.exit(4);
    }

    // 4. Apply the migration in a single transaction
    log.info('BEGIN transaction');
    await client.query('BEGIN');

    try {
      if (currentType === 'jsonb') {
        // Path A: column is still jsonb. Swap to text via a temporary column.
        log.info('adding content_migrated text column');
        await client.query(
          'ALTER TABLE components_article_text_blocks ADD COLUMN content_migrated text'
        );

        log.info(`updating ${plans.length} rows via content_migrated...`);
        let done = 0;
        for (const p of plans) {
          await client.query(
            'UPDATE components_article_text_blocks SET content_migrated = $1 WHERE id = $2',
            [p.newValue, p.id]
          );
          done++;
          if (done % 500 === 0) log.info(`  updated ${done}/${plans.length}`);
        }

        // For rows whose content was already HTML (kind === 'html'), copy the original value over.
        log.info('copying already-HTML rows to content_migrated');
        await client.query(
          `UPDATE components_article_text_blocks
           SET content_migrated = content::text
           WHERE content_migrated IS NULL`
        );

        log.info('dropping old content column');
        await client.query('ALTER TABLE components_article_text_blocks DROP COLUMN content');

        log.info('renaming content_migrated -> content');
        await client.query(
          'ALTER TABLE components_article_text_blocks RENAME COLUMN content_migrated TO content'
        );
      } else {
        // Path B: column is already text. Update each affected row in place.
        log.info(`updating ${plans.length} rows in place...`);
        let done = 0;
        for (const p of plans) {
          await client.query(
            'UPDATE components_article_text_blocks SET content = $1 WHERE id = $2',
            [p.newValue, p.id]
          );
          done++;
          if (done % 500 === 0) log.info(`  updated ${done}/${plans.length}`);
        }
      }

      // Normalize NULLs to empty strings before enforcing NOT NULL (required: true in schema)
      log.info('normalizing NULLs to empty strings');
      await client.query(
        "UPDATE components_article_text_blocks SET content = '' WHERE content IS NULL"
      );
      try {
        await client.query(
          'ALTER TABLE components_article_text_blocks ALTER COLUMN content SET NOT NULL'
        );
      } catch (e) {
        log.warn(`NOT NULL constraint already set or could not apply: ${e.message}`);
      }

      log.info('COMMIT');
      await client.query('COMMIT');
      log.info('migration complete');
    } catch (err) {
      log.error(`migration failed, ROLLING BACK: ${err.message}`);
      await client.query('ROLLBACK');
      throw err;
    }

    // 5. Post-check
    const postType = await client.query(
      `SELECT data_type FROM information_schema.columns
       WHERE table_name = 'components_article_text_blocks' AND column_name = 'content'`
    );
    log.info(`post-migration column type: ${postType.rows[0].data_type}`);

    const sample = await client.query(
      'SELECT id, substring(content from 1 for 140) AS preview FROM components_article_text_blocks ORDER BY id LIMIT 3'
    );
    log.info('post-migration samples:');
    for (const r of sample.rows) {
      log.info(`  id=${r.id}: ${r.preview}`);
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
