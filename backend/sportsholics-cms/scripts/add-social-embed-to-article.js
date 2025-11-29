/**
 * Helper script to add social media embeds to article content
 *
 * Usage:
 *   node scripts/add-social-embed-to-article.js
 *
 * This script helps editors add social media posts (Twitter/X, Facebook, TikTok, Instagram)
 * to existing articles by adding components to the Dynamic Zone content.
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

const PLATFORMS = {
  1: { name: 'Twitter/X', value: 'twitter' },
  2: { name: 'Facebook', value: 'facebook' },
  3: { name: 'TikTok', value: 'tiktok' },
  4: { name: 'Instagram', value: 'instagram' },
};

const CONTENT_TYPES = {
  1: 'football-articles',
  2: 'basketball-articles',
  3: 'formula1-articles',
  4: 'news-articles',
  5: 'blog-articles',
};

// Instructions for getting embed codes from each platform
const PLATFORM_INSTRUCTIONS = {
  twitter: `
    📱 How to get Twitter/X embed code:
    1. Go to the tweet you want to embed
    2. Click the share icon (⋯)
    3. Select "Embed Tweet"
    4. Copy the entire HTML code (including <blockquote> and <script> tags)
  `,
  facebook: `
    📱 How to get Facebook embed code:
    1. Go to the post you want to embed
    2. Click the three dots (...) on the post
    3. Select "Embed"
    4. Copy the entire HTML code
  `,
  tiktok: `
    📱 How to get TikTok embed code:
    1. Go to the TikTok video
    2. Click the share icon
    3. Select "Embed"
    4. Copy the entire HTML code (including <blockquote> and <script> tags)
  `,
  instagram: `
    📱 How to get Instagram embed code:
    1. Go to the Instagram post
    2. Click the three dots (...) in the top right
    3. Select "Embed"
    4. Copy the entire HTML code (including <blockquote> and <script> tags)
  `,
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Get multiline input (for embed code)
async function getMultilineInput(prompt) {
  console.log(prompt);
  console.log('(Paste the embed code, then press Enter twice when done)\n');

  let lines = [];
  let emptyLineCount = 0;

  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.setEncoding('utf8');

    stdin.on('data', (chunk) => {
      const newLines = chunk.toString().split('\n');

      for (const line of newLines) {
        if (line.trim() === '') {
          emptyLineCount++;
          if (emptyLineCount >= 2) {
            stdin.pause();
            stdin.removeAllListeners('data');
            resolve(lines.join('\n').trim());
            return;
          }
        } else {
          emptyLineCount = 0;
          lines.push(line);
        }
      }
    });

    stdin.resume();
  });
}

// Fetch article by ID
async function fetchArticle(contentType, articleId) {
  const url = `${STRAPI_URL}/api/${contentType}/${articleId}?populate=*`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ADMIN_JWT}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

// Update article with new social embed
async function updateArticle(contentType, articleId, updatedContent) {
  const url = `${STRAPI_URL}/api/${contentType}/${articleId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ADMIN_JWT}`,
    },
    body: JSON.stringify({
      data: {
        content: updatedContent,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update article: ${response.statusText}`);
  }

  return await response.json();
}

// Main function
async function main() {
  console.log('\n🎬 Social Media Embed Helper\n');

  // Select content type
  console.log('Select content type:');
  Object.entries(CONTENT_TYPES).forEach(([key, value]) => {
    console.log(`  ${key}. ${value}`);
  });

  const contentTypeChoice = await question('\nEnter content type number: ');
  const contentType = CONTENT_TYPES[contentTypeChoice];

  if (!contentType) {
    console.error('❌ Invalid content type');
    rl.close();
    return;
  }

  // Get article ID
  const articleId = await question('Enter article ID: ');

  // Fetch the article
  console.log('\n📥 Fetching article...');
  let article;
  try {
    article = await fetchArticle(contentType, articleId);
    console.log(`✅ Found article: "${article.title}"`);
  } catch (error) {
    console.error('❌ Error fetching article:', error.message);
    rl.close();
    return;
  }

  // Select platform
  console.log('\nSelect social media platform:');
  Object.entries(PLATFORMS).forEach(([key, { name }]) => {
    console.log(`  ${key}. ${name}`);
  });

  const platformChoice = await question('\nEnter platform number: ');
  const platform = PLATFORMS[platformChoice];

  if (!platform) {
    console.error('❌ Invalid platform');
    rl.close();
    return;
  }

  // Show platform-specific instructions
  console.log(PLATFORM_INSTRUCTIONS[platform.value]);

  // Get embed code
  const embedCode = await getMultilineInput('\n📝 Paste the embed code:');

  if (!embedCode) {
    console.error('❌ Embed code cannot be empty');
    rl.close();
    return;
  }

  // Get optional caption
  const caption = await question('\n📝 Enter optional caption (or press Enter to skip): ');

  // Create social media embed component
  const socialEmbedComponent = {
    __component: 'article.social-media-embed',
    platform: platform.value,
    embedCode: embedCode,
    ...(caption && { caption }),
  };

  // Ask where to insert the embed
  console.log('\nWhere should the embed be added?');
  console.log('  1. At the beginning');
  console.log('  2. At the end');
  console.log('  3. At specific position');

  const positionChoice = await question('\nEnter position choice: ');

  let updatedContent = [...article.content];

  if (positionChoice === '1') {
    // At the beginning
    updatedContent.unshift(socialEmbedComponent);
  } else if (positionChoice === '2') {
    // At the end
    updatedContent.push(socialEmbedComponent);
  } else if (positionChoice === '3') {
    // At specific position
    const position = parseInt(await question('Enter position (0-based index): '));
    if (isNaN(position) || position < 0 || position > updatedContent.length) {
      console.error('❌ Invalid position');
      rl.close();
      return;
    }
    updatedContent.splice(position, 0, socialEmbedComponent);
  } else {
    console.error('❌ Invalid choice');
    rl.close();
    return;
  }

  // Confirm update
  console.log('\n📊 Summary:');
  console.log(`  Article: "${article.title}"`);
  console.log(`  Platform: ${platform.name}`);
  console.log(`  Caption: ${caption || '(none)'}`);
  console.log(`  Components: ${updatedContent.length} (was ${article.content.length})`);

  const confirm = await question('\n✅ Update article? (y/n): ');

  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Cancelled');
    rl.close();
    return;
  }

  // Update the article
  console.log('\n📤 Updating article...');
  try {
    await updateArticle(contentType, articleId, updatedContent);
    console.log('✅ Article updated successfully!');
    console.log(`\n🌐 View at: ${STRAPI_URL}/admin/content-manager/collection-types/api::${contentType.slice(0, -1)}.${contentType.slice(0, -1)}/${articleId}`);
  } catch (error) {
    console.error('❌ Error updating article:', error.message);
  }

  rl.close();
}

// Run the script
main().catch((error) => {
  console.error('❌ Error:', error);
  rl.close();
  process.exit(1);
});
