/**
 * Cleanup Script for Sports-holics CMS
 * Deletes ALL data from collection types
 * 
 * ⚠️  WARNING: This will delete EVERYTHING!
 * 
 * Usage:
 * node scripts/cleanup-all-data.js
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// const STRAPI_URL = 'https://clever-garden-138bbdfa99.strapiapp.com';
const STRAPI_URL = 'http://127.0.0.1:1337';

// Read token from file
let ADMIN_JWT = '';
try {
  const tokenPath = path.join(__dirname, 'strapi.token');
  ADMIN_JWT = fs.readFileSync(tokenPath, 'utf8').trim();
} catch (error) {
  console.error('❌ Error reading token file:', error.message);
  console.log('\n📝 Please create a file: scripts/strapi.token');
  console.log('   and paste your Strapi API token inside it.\n');
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

// Helper function to fetch all entries
async function fetchAll(endpoint) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=100`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_JWT}`
        }
      }
    );

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch ${endpoint}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.data || [];
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
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
}

// Main cleanup function
async function cleanupAllData() {
  console.log('🗑️  Cleanup Script for Sports-holics CMS\n');
  console.log('═══════════════════════════════════════\n');
  
  console.log('⚠️  WARNING: This will DELETE ALL data from:\n');
  COLLECTIONS.forEach(col => console.log(`   - ${col.name}`));
  console.log('\n⚠️  This action CANNOT be undone!\n');

  // Ask for confirmation
  const confirmed = await askConfirmation('Are you sure you want to continue? (yes/no): ');
  
  if (!confirmed) {
    console.log('\n✅ Cleanup cancelled. No data was deleted.\n');
    return;
  }

  console.log('\n🗑️  Starting cleanup...\n');

  let totalDeleted = 0;

  // Delete from each collection
  for (const collection of COLLECTIONS) {
    console.log(`📂 Cleaning ${collection.name}...`);
    
    const entries = await fetchAll(collection.endpoint);
    
    if (entries.length === 0) {
      console.log(`   ℹ️  No entries found`);
      continue;
    }

    let deleted = 0;
    for (const entry of entries) {
      const success = await deleteEntry(collection.endpoint, entry.documentId || entry.id);
      if (success) {
        deleted++;
      }
    }

    console.log(`   ✅ Deleted ${deleted}/${entries.length} entries`);
    totalDeleted += deleted;
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`\n✅ CLEANUP COMPLETE!`);
  console.log(`\n📊 Total entries deleted: ${totalDeleted}\n`);
}

// Run the cleanup
cleanupAllData().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});

