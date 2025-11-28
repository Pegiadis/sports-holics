/**
 * Helper script to add YouTube videos to article content
 *
 * Usage:
 *   node scripts/add-video-to-article.js
 *
 * This script helps editors add YouTube videos to existing articles
 * by modifying the article's description/content blocks.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Read API token from file
let ADMIN_JWT = '';
try {
  const tokenPath = path.join(__dirname, 'strapi.token');
  ADMIN_JWT = fs.readFileSync(tokenPath, 'utf8').trim();
} catch (error) {
  console.error('❌ Error reading token file:', error.message);
  console.log('\n💡 Please create a file at scripts/strapi.token with your Strapi API token\n');
  process.exit(1);
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Create video block object
function createVideoBlock(url) {
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  return {
    type: 'video',
    provider: 'youtube',
    url: url.trim(),
    videoId: videoId,
  };
}

// Readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Fetch article
async function fetchArticle(contentType, articleId) {
  const response = await fetch(`${STRAPI_URL}/api/${contentType}/${articleId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ADMIN_JWT}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  return await response.json();
}

// Update article
async function updateArticle(contentType, articleId, data) {
  const response = await fetch(`${STRAPI_URL}/api/${contentType}/${articleId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ADMIN_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update article: ${response.statusText}`);
  }

  return await response.json();
}

// Main script
async function main() {
  console.log('\n🎥 YouTube Video Embedding Helper\n');
  console.log('This script helps you add YouTube videos to article content.\n');

  try {
    // Ask for content type
    console.log('Content Types:');
    console.log('  1. football-articles');
    console.log('  2. basketball-articles');
    console.log('  3. formula1-articles');
    console.log('  4. news-articles');
    console.log('  5. blog-articles');
    const contentTypeChoice = await askQuestion('\nSelect content type (1-5): ');

    const contentTypes = {
      '1': 'football-articles',
      '2': 'basketball-articles',
      '3': 'formula1-articles',
      '4': 'news-articles',
      '5': 'blog-articles',
    };

    const contentType = contentTypes[contentTypeChoice];
    if (!contentType) {
      console.log('❌ Invalid choice');
      rl.close();
      return;
    }

    // Ask for article ID
    const articleId = await askQuestion('Enter article ID: ');

    console.log(`\n📖 Fetching article from ${contentType}/${articleId}...`);
    const article = await fetchArticle(contentType, articleId);

    console.log(`✅ Found article: "${article.data.attributes.title}"`);

    // Determine which field to use (description or content)
    const contentField = article.data.attributes.description !== undefined ? 'description' : 'content';
    const currentBlocks = article.data.attributes[contentField] || [];

    console.log(`\n📝 Current content has ${currentBlocks.length} blocks`);

    // Ask for YouTube URL
    const youtubeUrl = await askQuestion('\nEnter YouTube URL: ');

    // Validate and create video block
    let videoBlock;
    try {
      videoBlock = createVideoBlock(youtubeUrl);
      console.log(`✅ Valid YouTube URL (Video ID: ${videoBlock.videoId})`);
    } catch (error) {
      console.log('❌', error.message);
      rl.close();
      return;
    }

    // Ask for position
    console.log('\nWhere do you want to add the video?');
    console.log('  1. Beginning of content');
    console.log('  2. End of content');
    console.log('  3. Specific position (enter block index)');
    const positionChoice = await askQuestion('Select position (1-3): ');

    let newBlocks = [...currentBlocks];

    if (positionChoice === '1') {
      newBlocks.unshift(videoBlock);
      console.log('📌 Adding video at the beginning');
    } else if (positionChoice === '2') {
      newBlocks.push(videoBlock);
      console.log('📌 Adding video at the end');
    } else if (positionChoice === '3') {
      const index = await askQuestion(`Enter block index (0-${currentBlocks.length}): `);
      const insertIndex = parseInt(index, 10);
      if (isNaN(insertIndex) || insertIndex < 0 || insertIndex > currentBlocks.length) {
        console.log('❌ Invalid index');
        rl.close();
        return;
      }
      newBlocks.splice(insertIndex, 0, videoBlock);
      console.log(`📌 Adding video at position ${insertIndex}`);
    } else {
      console.log('❌ Invalid choice');
      rl.close();
      return;
    }

    // Confirm update
    const confirm = await askQuestion('\n⚠️  Update article? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('❌ Cancelled');
      rl.close();
      return;
    }

    // Update the article
    console.log('\n📤 Updating article...');
    const updateData = {
      [contentField]: newBlocks,
    };

    await updateArticle(contentType, articleId, updateData);

    console.log('✅ Article updated successfully!');
    console.log(`\n📊 New content has ${newBlocks.length} blocks`);
    console.log('\n🎬 Video block added:');
    console.log(JSON.stringify(videoBlock, null, 2));
    console.log('\n✨ Check the article on the frontend to see the embedded video!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
