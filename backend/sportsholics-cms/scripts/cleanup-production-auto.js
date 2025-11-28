/**
 * Auto-confirmed Production Cleanup Script
 * Deletes ALL articles from PRODUCTION to fix migration issue
 */

const fs = require('fs');
const path = require('path');

// Production Strapi URL
const STRAPI_URL = process.env.PRODUCTION_STRAPI_URL || 'https://clever-garden-138bbdfa99.strapiapp.com';

// Read production token
let ADMIN_JWT = '';
try {
  const tokenPath = path.join(__dirname, 'strapi_stage.token');
  ADMIN_JWT = fs.readFileSync(tokenPath, 'utf8').trim();
} catch (error) {
  console.error('❌ Error reading token file:', error.message);
  process.exit(1);
}

// Collections to clean
const COLLECTIONS = [
  { name: 'Football Articles', endpoint: 'football-articles' },
  { name: 'Basketball Articles', endpoint: 'basketball-articles' },
  { name: 'Formula1 Articles', endpoint: 'formula1-articles' },
  { name: 'News Articles', endpoint: 'news-articles' },
  { name: 'Blog Articles', endpoint: 'blog-articles' },
  { name: 'Breaking News', endpoint: 'breaking-news-items' }
];

// Fetch all entries with pagination
async function fetchAll(endpoint) {
  try {
    let allEntries = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `${STRAPI_URL}/api/${endpoint}?pagination[page]=${page}&pagination[pageSize]=100`,
        {
          headers: {
            'Authorization': `Bearer ${ADMIN_JWT}`
          }
        }
      );

      if (!response.ok) {
        console.warn(`   ⚠️  Failed to fetch page ${page}`);
        break;
      }

      const result = await response.json();
      const entries = result.data || [];
      allEntries = allEntries.concat(entries);

      // Check if there are more pages
      const pagination = result.meta?.pagination;
      hasMore = pagination && page < pagination.pageCount;
      page++;
    }

    return allEntries;
  } catch (error) {
    console.error(`   ❌ Error fetching:`, error.message);
    return [];
  }
}

// Delete a single entry
async function deleteEntry(endpoint, id) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/${endpoint}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ADMIN_JWT}`
        }
      }
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main cleanup
async function cleanup() {
  console.log('\n🗑️  AUTO CLEANUP - Fixing Migration Issue\n');
  console.log('═══════════════════════════════════════════\n');
  console.log(`🌐 Target: ${STRAPI_URL}\n`);
  console.log('🔄 Deleting articles to allow schema migration...\n');

  let totalDeleted = 0;

  for (const collection of COLLECTIONS) {
    console.log(`📂 Cleaning ${collection.name}...`);
    
    const entries = await fetchAll(collection.endpoint);
    
    if (entries.length === 0) {
      console.log(`   ✓ No entries found`);
      continue;
    }

    console.log(`   Found ${entries.length} entries`);

    let deleted = 0;
    for (const entry of entries) {
      const success = await deleteEntry(collection.endpoint, entry.documentId || entry.id);
      if (success) deleted++;
      
      if (deleted % 10 === 0 && deleted > 0) {
        process.stdout.write(`   Deleted ${deleted}/${entries.length}...\r`);
      }
    }

    console.log(`   ✅ Deleted ${deleted}/${entries.length} entries`);
    totalDeleted += deleted;
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`\n✅ CLEANUP COMPLETE - Deleted ${totalDeleted} total entries`);
  console.log('\n💡 Production database is now clean and ready for migration');
  console.log('💡 Strapi should now start successfully and apply the schema migration\n');
}

// Validate URL
if (STRAPI_URL.includes('localhost')) {
  console.error('\n❌ ERROR: This script is for PRODUCTION only!\n');
  process.exit(1);
}

// Run
cleanup().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
