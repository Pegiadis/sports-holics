/**
 * Production Cleanup Script for Sports-holics CMS
 * Deletes ALL data from collection types in PRODUCTION environment
 *
 * ⚠️  EXTREME WARNING: This will delete EVERYTHING from PRODUCTION!
 * ⚠️  ONLY use this if you are ABSOLUTELY SURE!
 *
 * Usage:
 * node scripts/cleanup-production.js
 *
 * Requirements:
 * - Create a file: scripts/strapi_production.token
 * - Paste your production Strapi API token (Full Access) inside it
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Production Strapi URL - UPDATE THIS!
const STRAPI_URL = process.env.PRODUCTION_STRAPI_URL || 'https://clever-garden-138bbdfa99.strapiapp.com';

// Read production token from file
let ADMIN_JWT = '';
try {
  const tokenPath = path.join(__dirname, 'strapi_stage.token');
  ADMIN_JWT = fs.readFileSync(tokenPath, 'utf8').trim();
} catch (error) {
  console.error('❌ Error reading production token file:', error.message);
  console.log('\n📝 Please create a file: scripts/strapi_stage.token');
  console.log('   and paste your PRODUCTION Strapi API token inside it.\n');
  process.exit(1);
}

// Collection types to clean
const COLLECTIONS = [
  { name: 'Football Articles', endpoint: 'football-articles' },
  { name: 'Basketball Articles', endpoint: 'basketball-articles' },
  { name: 'Formula1 Articles', endpoint: 'formula1-articles' },
  { name: 'News Articles', endpoint: 'news-articles' },
  { name: 'Blog Articles', endpoint: 'blog-articles' },
  { name: 'Journalists', endpoint: 'journalists' },
  { name: 'Hero Sections', endpoint: 'hero-sections' },
  { name: 'Breaking News', endpoint: 'breaking-news-items' }
];

// Helper function to fetch all entries with pagination
async function fetchAll(endpoint) {
  try {
    let allEntries = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `${STRAPI_URL}/api/${endpoint}?pagination[page]=${page}&pagination[pageSize]=100`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_JWT}`
          }
        }
      );

      if (!response.ok) {
        console.warn(`⚠️  Failed to fetch ${endpoint} page ${page}: ${response.status}`);
        break;
      }

      const data = await response.json();
      const entries = data.data || [];
      allEntries = allEntries.concat(entries);

      // Check if there are more pages
      const pagination = data.meta?.pagination;
      if (pagination && page < pagination.pageCount) {
        page++;
      } else {
        hasMore = false;
      }
    }

    return allEntries;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message);
    return [];
  }
}

// Helper function to delete entry
async function deleteEntry(endpoint, id) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/${endpoint}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_JWT}`
        }
      }
    );

    return response.ok;
  } catch (error) {
    return false;
  }
}

// Ask for confirmation
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Main cleanup function
async function cleanupProduction() {
  console.log('\n🔥 PRODUCTION CLEANUP SCRIPT 🔥\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log(`🌐 Target URL: ${STRAPI_URL}\n`);

  console.log('⚠️  ⚠️  ⚠️  EXTREME WARNING ⚠️  ⚠️  ⚠️\n');
  console.log('This will DELETE ALL data from PRODUCTION:\n');
  COLLECTIONS.forEach(col => console.log(`   - ${col.name}`));
  console.log('\n⚠️  This action CANNOT be undone!');
  console.log('⚠️  All production content will be LOST!');
  console.log('⚠️  Make sure you have a BACKUP!\n');

  // First confirmation
  const confirm1 = await askConfirmation('Type "DELETE PRODUCTION" to continue: ');

  if (confirm1 !== 'DELETE PRODUCTION') {
    console.log('\n✅ Cleanup cancelled. No data was deleted.\n');
    return;
  }

  // Second confirmation
  console.log('\n⚠️  FINAL WARNING: Are you ABSOLUTELY SURE?\n');
  const confirm2 = await askConfirmation('Type "YES I AM SURE" to proceed: ');

  if (confirm2 !== 'YES I AM SURE') {
    console.log('\n✅ Cleanup cancelled. No data was deleted.\n');
    return;
  }

  console.log('\n🗑️  Starting production cleanup...\n');

  let totalDeleted = 0;

  // Delete from each collection
  for (const collection of COLLECTIONS) {
    console.log(`📂 Cleaning ${collection.name}...`);

    const entries = await fetchAll(collection.endpoint);

    if (entries.length === 0) {
      console.log(`   ℹ️  No entries found`);
      continue;
    }

    console.log(`   Found ${entries.length} entries to delete...`);

    let deleted = 0;
    for (const entry of entries) {
      const success = await deleteEntry(collection.endpoint, entry.documentId || entry.id);
      if (success) {
        deleted++;
        // Show progress for large deletions
        if (deleted % 10 === 0) {
          process.stdout.write(`\r   Deleted ${deleted}/${entries.length}...`);
        }
      }
    }

    console.log(`\r   ✅ Deleted ${deleted}/${entries.length} entries`);
    totalDeleted += deleted;
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`\n✅ PRODUCTION CLEANUP COMPLETE!`);
  console.log(`\n📊 Total entries deleted: ${totalDeleted}`);
  console.log(`\n⚠️  Production database is now empty!`);
  console.log(`💡 You can now run seed-production.js to populate with fresh data.\n`);
}

// Validate production URL before running
if (STRAPI_URL.includes('localhost') || STRAPI_URL.includes('127.0.0.1')) {
  console.error('\n❌ ERROR: This script is for PRODUCTION only!');
  console.error('   The URL points to localhost. Use cleanup-all-data.js instead.\n');
  process.exit(1);
}

// Run the cleanup
cleanupProduction().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
