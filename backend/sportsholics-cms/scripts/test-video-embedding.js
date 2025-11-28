/**
 * Test script for YouTube video embedding
 *
 * This script creates a test article with a video block to verify
 * that the frontend correctly renders YouTube embeds.
 *
 * Usage:
 *   node scripts/test-video-embedding.js
 */

const fs = require('fs');
const path = require('path');

// Read API token
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

// Test YouTube videos
const testVideos = [
  {
    title: 'Standard youtube.com/watch URL',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title: 'Short youtu.be URL',
    url: 'https://youtu.be/dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title: 'Embed URL',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
  },
];

// Create test article with video
async function createTestArticle() {
  console.log('\n🎥 Testing YouTube Video Embedding\n');

  // Create article content with multiple blocks including videos
  const articleContent = [
    {
      type: 'heading',
      level: 2,
      children: [
        {
          type: 'text',
          text: 'Δοκιμή YouTube Video Embedding',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Αυτό είναι ένα δοκιμαστικό άρθρο που περιέχει embedded YouTube videos. Παρακάτω θα δείτε διάφορα παραδείγματα video embeds.',
        },
      ],
    },
    {
      type: 'heading',
      level: 3,
      children: [
        {
          type: 'text',
          text: 'Video 1: Standard YouTube URL',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Αυτό το video χρησιμοποιεί το standard youtube.com/watch?v= format:',
        },
      ],
    },
    {
      type: 'video',
      provider: 'youtube',
      url: testVideos[0].url,
      videoId: testVideos[0].videoId,
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Το video πρέπει να εμφανίζεται με responsive 16:9 aspect ratio και lazy loading.',
        },
      ],
    },
    {
      type: 'heading',
      level: 3,
      children: [
        {
          type: 'text',
          text: 'Video 2: Short youtu.be URL',
        },
      ],
    },
    {
      type: 'video',
      provider: 'youtube',
      url: testVideos[1].url,
      videoId: testVideos[1].videoId,
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Και αυτό το video format πρέπει να λειτουργεί άψογα.',
        },
      ],
    },
    {
      type: 'heading',
      level: 3,
      children: [
        {
          type: 'text',
          text: 'Τεστ Completed!',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Αν βλέπετε αυτά τα videos στο frontend, το YouTube embedding λειτουργεί σωστά! ✅',
          bold: true,
        },
      ],
    },
  ];

  const articleData = {
    title: '[TEST] YouTube Video Embedding Test Article',
    subtitle: 'Δοκιμαστικό άρθρο για video embedding',
    description: articleContent,
    author: null,
    slug: `test-video-embedding-${Date.now()}`,
    publishedAt: new Date().toISOString(),
  };

  try {
    console.log('📝 Creating test article in football-articles...');

    const response = await fetch(`${STRAPI_URL}/api/football-articles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ADMIN_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: articleData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create article: ${JSON.stringify(errorData, null, 2)}`);
    }

    const result = await response.json();

    console.log('✅ Test article created successfully!');
    console.log(`\n📊 Article ID: ${result.data.id}`);
    console.log(`📝 Title: ${result.data.attributes.title}`);
    console.log(`🔗 Slug: ${result.data.attributes.slug}`);
    console.log(`\n🌐 View on frontend: http://localhost:3000/article/${result.data.attributes.slug}`);
    console.log('\n📹 Videos tested:');
    testVideos.forEach((video, index) => {
      console.log(`  ${index + 1}. ${video.title}`);
      console.log(`     URL: ${video.url}`);
      console.log(`     Video ID: ${video.videoId}`);
    });
    console.log('\n✨ If you see embedded videos on the frontend, everything is working!\n');

    return result;

  } catch (error) {
    console.error('\n❌ Error creating test article:', error.message);
    process.exit(1);
  }
}

// Run test
createTestArticle();
