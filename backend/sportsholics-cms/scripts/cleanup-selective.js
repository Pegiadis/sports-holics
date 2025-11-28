/**
 * Selective Cleanup Script for Sports-holics CMS
 * Lets you choose which collection types to delete
 * 
 * Usage:
 * node scripts/cleanup-selective.js
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Collection types available
const COLLECTIONS = [
  { id: 1, name: 'Football Articles', endpoint: 'football-articles', emoji: '⚽' },
  { id: 2, name: 'Basketball Articles', endpoint: 'basketball-articles', emoji: '🏀' },
  { id: 3, name: 'Formula1 Articles', endpoint: 'formula1-articles', emoji: '🏎️' },
  { id: 4, name: 'News Articles', endpoint: 'news-articles', emoji: '📰' },
  { id: 5, name: 'Blog Articles', endpoint: 'blog-articles', emoji: '📝' },
  { id: 6, name: 'Journalists', endpoint: 'journalists', emoji: '👥' },
  { id: 7, name: 'Hero Sections', endpoint: 'hero-sections', emoji: '🎯' },
  { id: 8, name: 'Breaking News', endpoint: 'breaking-news-items', emoji: '🔥' }
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
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
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

// Ask for input
function askQuestion(question) {
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
async function selectiveCleanup() {
  console.log('🗑️  Selective Cleanup Script\n');
  console.log('═══════════════════════════════════════\n');
  
  console.log('Select collection types to delete:\n');
  
  // Show menu
  for (const col of COLLECTIONS) {
    const entries = await fetchAll(col.endpoint);
    console.log(`${col.id}. ${col.emoji} ${col.name} (${entries.length} entries)`);
  }
  
  console.log('9. 🗑️  DELETE ALL');
  console.log('0. ❌ Cancel\n');

  const answer = await askQuestion('Enter numbers separated by commas (e.g., 1,2,5): ');
  
  if (answer === '0' || answer.trim() === '') {
    console.log('\n✅ Cleanup cancelled.\n');
    return;
  }

  // Parse selection
  let selectedIds = [];
  
  if (answer === '9') {
    selectedIds = COLLECTIONS.map(c => c.id);
  } else {
    selectedIds = answer.split(',')
      .map(s => parseInt(s.trim()))
      .filter(id => id >= 1 && id <= 8);
  }

  if (selectedIds.length === 0) {
    console.log('\n❌ No valid selections. Exiting.\n');
    return;
  }

  const selectedCollections = COLLECTIONS.filter(c => selectedIds.includes(c.id));

  console.log('\n⚠️  You are about to delete:\n');
  for (const col of selectedCollections) {
    console.log(`   ${col.emoji} ${col.name}`);
  }

  const confirmed = await askQuestion('\nConfirm deletion? (yes/no): ');
  
  if (confirmed.toLowerCase() !== 'yes' && confirmed.toLowerCase() !== 'y') {
    console.log('\n✅ Cleanup cancelled.\n');
    return;
  }

  console.log('\n🗑️  Starting cleanup...\n');

  let totalDeleted = 0;

  // Delete from selected collections
  for (const collection of selectedCollections) {
    console.log(`${collection.emoji} Cleaning ${collection.name}...`);
    
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
selectiveCleanup().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});

