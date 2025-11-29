/**
 * Test script for social media embeds
 *
 * Usage:
 *   node scripts/test-social-embeds.js
 *
 * This script creates a test football article with sample social media embeds
 * from all supported platforms (Twitter/X, Facebook, TikTok, Instagram) to verify
 * that the embedding functionality works correctly on the frontend.
 */

const fs = require('fs');
const path = require('path');

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

// Sample embed codes (using real examples, but you can replace with actual posts)
const SAMPLE_EMBEDS = {
  twitter: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just setting up my twttr</p>&mdash; jack (@jack) <a href="https://twitter.com/jack/status/20?ref_src=twsrc%5Etfw">March 21, 2006</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,

  facebook: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fposts%2F10158791540676729&show_text=true&width=500" width="500" height="660" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,

  tiktok: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tiktok/video/6829267836783971586" data-video-id="6829267836783971586" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tiktok" href="https://www.tiktok.com/@tiktok">@tiktok</a> <p></p> <a target="_blank" title="♬ original sound - TikTok" href="https://www.tiktok.com/music/original-sound-6829267863923944197">♬ original sound - TikTok</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,

  instagram: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> </a></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>`,
};

async function createTestArticle() {
  console.log('\n🧪 Creating test article with social media embeds...\n');

  const testArticle = {
    data: {
      title: 'Τεστ Άρθρο - Social Media Embeds',
      subtitle: 'Δοκιμαστικό άρθρο με ενσωματωμένες αναρτήσεις από social media',
      content: [
        // Intro text
        {
          __component: 'article.text-block',
          content: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Αυτό είναι ένα δοκιμαστικό άρθρο που δείχνει πώς λειτουργούν οι ενσωματωμένες αναρτήσεις από διάφορες πλατφόρμες κοινωνικής δικτύωσης.',
                },
              ],
            },
            {
              type: 'heading',
              level: 2,
              children: [
                {
                  type: 'text',
                  text: 'Twitter/X Embed',
                },
              ],
            },
          ],
        },
        // Twitter embed
        {
          __component: 'article.social-media-embed',
          platform: 'twitter',
          embedCode: SAMPLE_EMBEDS.twitter,
          caption: 'Το πρώτο tweet στο Twitter',
        },
        // Text between embeds
        {
          __component: 'article.text-block',
          content: [
            {
              type: 'heading',
              level: 2,
              children: [
                {
                  type: 'text',
                  text: 'Facebook Embed',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Μπορούμε να ενσωματώσουμε και αναρτήσεις από το Facebook:',
                },
              ],
            },
          ],
        },
        // Facebook embed
        {
          __component: 'article.social-media-embed',
          platform: 'facebook',
          embedCode: SAMPLE_EMBEDS.facebook,
          caption: 'Επίσημη ανάρτηση Facebook',
        },
        // Text between embeds
        {
          __component: 'article.text-block',
          content: [
            {
              type: 'heading',
              level: 2,
              children: [
                {
                  type: 'text',
                  text: 'TikTok Embed',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Βίντεο από το TikTok μπορούν επίσης να ενσωματωθούν:',
                },
              ],
            },
          ],
        },
        // TikTok embed
        {
          __component: 'article.social-media-embed',
          platform: 'tiktok',
          embedCode: SAMPLE_EMBEDS.tiktok,
          caption: 'Επίσημο TikTok βίντεο',
        },
        // Text between embeds
        {
          __component: 'article.text-block',
          content: [
            {
              type: 'heading',
              level: 2,
              children: [
                {
                  type: 'text',
                  text: 'Instagram Embed',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Και φυσικά, αναρτήσεις από το Instagram:',
                },
              ],
            },
          ],
        },
        // Instagram embed
        {
          __component: 'article.social-media-embed',
          platform: 'instagram',
          embedCode: SAMPLE_EMBEDS.instagram,
          caption: 'Ανάρτηση Instagram',
        },
        // Conclusion
        {
          __component: 'article.text-block',
          content: [
            {
              type: 'heading',
              level: 2,
              children: [
                {
                  type: 'text',
                  text: 'Συμπέρασμα',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Όλες οι πλατφόρμες κοινωνικής δικτύωσης υποστηρίζονται και εμφανίζονται σωστά στο άρθρο. Κάθε embed είναι responsive και λειτουργεί με ασφάλεια χάρη στο HTML sanitization.',
                },
              ],
            },
          ],
        },
      ],
      publishedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/football-articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_JWT}`,
      },
      body: JSON.stringify(testArticle),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create article: ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    const articleId = data.data.id;
    const slug = data.data.slug;

    console.log('✅ Test article created successfully!\n');
    console.log(`📝 Article ID: ${articleId}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`\n🌐 View in Strapi admin:`);
    console.log(`   ${STRAPI_URL}/admin/content-manager/collection-types/api::football-article.football-article/${articleId}`);
    console.log(`\n🌐 View on frontend (after publishing):`);
    console.log(`   http://localhost:3000/article/${slug}`);
    console.log('\n💡 Remember to publish the article in Strapi admin to see it on the frontend!\n');
  } catch (error) {
    console.error('❌ Error creating test article:', error.message);
    process.exit(1);
  }
}

// Run the script
createTestArticle();
