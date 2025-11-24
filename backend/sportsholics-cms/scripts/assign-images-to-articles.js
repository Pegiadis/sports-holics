/**
 * Assign Existing Images to Articles in Production
 * This script fetches existing images and randomly assigns them to articles
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

// Helper functions
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fetch all images
async function fetchImages() {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/upload/files?pagination[pageSize]=100`,
      {
        headers: { 'Authorization': `Bearer ${ADMIN_JWT}` }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch images');
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching images:', error.message);
    return [];
  }
}

// Fetch all articles from an endpoint
async function fetchArticles(endpoint) {
  try {
    let allArticles = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `${STRAPI_URL}/api/${endpoint}?pagination[page]=${page}&pagination[pageSize]=100`,
        {
          headers: { 'Authorization': `Bearer ${ADMIN_JWT}` }
        }
      );

      if (!response.ok) break;

      const result = await response.json();
      const articles = result.data || [];
      allArticles = allArticles.concat(articles);

      const pagination = result.meta?.pagination;
      hasMore = pagination && page < pagination.pageCount;
      page++;
    }

    return allArticles;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return [];
  }
}

// Update article with image
async function updateArticle(endpoint, articleId, imageId) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/${endpoint}/${articleId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_JWT}`
        },
        body: JSON.stringify({
          data: {
            image: imageId
          }
        })
      }
    );

    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main function
async function assignImages() {
  console.log('\n🖼️  ASSIGN IMAGES TO ARTICLES\n');
  console.log('═══════════════════════════════════════════\n');
  console.log(`🌐 Target: ${STRAPI_URL}\n`);

  // Fetch all images
  console.log('📸 Fetching available images...');
  const images = await fetchImages();
  
  if (images.length === 0) {
    console.log('❌ No images found in production!\n');
    return;
  }

  console.log(`   ✅ Found ${images.length} images\n`);

  // Article types to update
  const articleTypes = [
    { name: 'Football', endpoint: 'football-articles' },
    { name: 'Basketball', endpoint: 'basketball-articles' },
    { name: 'Formula 1', endpoint: 'formula1-articles' },
    { name: 'News', endpoint: 'news-articles' }
  ];

  let totalUpdated = 0;

  // Update each article type
  for (const type of articleTypes) {
    console.log(`🔄 Updating ${type.name} Articles...`);
    
    const articles = await fetchArticles(type.endpoint);
    
    if (articles.length === 0) {
      console.log(`   ⚠️  No articles found`);
      continue;
    }

    let updated = 0;
    for (const article of articles) {
      // Skip if already has image
      if (article.image) {
        continue;
      }

      // Assign random image
      const randomImage = randomItem(images);
      const success = await updateArticle(
        type.endpoint,
        article.documentId || article.id,
        randomImage.id
      );

      if (success) {
        updated++;
      }

      // Show progress
      if (updated % 5 === 0 && updated > 0) {
        process.stdout.write(`   Updated ${updated}/${articles.length}...\r`);
      }
    }

    console.log(`   ✅ Updated ${updated}/${articles.length} articles`);
    totalUpdated += updated;
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`\n✅ COMPLETE - Updated ${totalUpdated} articles with images\n`);
}

// Validate URL
if (STRAPI_URL.includes('localhost')) {
  console.error('\n❌ ERROR: This script is for PRODUCTION only!\n');
  process.exit(1);
}

// Run
assignImages().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});
