/**
 * Production Seed Script for Sports-holics CMS
 * Populates PRODUCTION database with test/demo data
 *
 * ⚠️  WARNING: Use only on EMPTY production database!
 *
 * Usage:
 * node scripts/seed-production.js
 *
 * Requirements:
 * - Create a file: scripts/strapi_production.token
 * - Paste your production Strapi API token (Full Access) inside it
 * - Place images in backend/sportsholics-cms/public/demo-images/
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

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

// Available demo images (already uploaded to Strapi)
// Note: We'll skip image upload since images already exist in production
const AVAILABLE_IMAGES = [];

// Greek sample data
const greekTitles = {
  football: [
    'Παναθηναϊκός: Η μεγάλη νίκη στο ντέρμπι',
    'Ολυμπιακός: Νέα μεταγραφή-βόμβα',
    'ΑΕΚ: Επιστροφή στις νίκες',
    'ΠΑΟΚ: Πρόκριση στην Ευρώπη',
    'Εθνική Ελλάδας: Προετοιμασία για το Euro',
    'Champions League: Ιστορική βραδιά',
    'Super League: Τα highlights της αγωνιστικής',
    'Μεταγραφές: Οι τελευταίες εξελίξεις',
    'Προπονητής: Νέα συμφωνία',
    'Τραυματισμός: Εκτός για έναν μήνα',
    'Κύπελλο Ελλάδας: Τα ζευγάρια των ημιτελικών',
    'Διαιτησία: Η μεγάλη αμφισβήτηση',
    'Οπαδοί: Sold out στο γήπεδο',
    'VAR: Η αμφιλεγόμενη φάση',
    'Ρεκόρ: Ιστορικό γκολ'
  ],
  basketball: [
    'Παναθηναϊκός: Πρωταθλητής Ευρώπης',
    'Ολυμπιακός: Νίκη στο ΣΕΦ',
    'Γιάννης Αντετοκούνμπο: MVP της σεζόν',
    'Euroleague: Τα highlights',
    'NBA: Οι Έλληνες παίκτες',
    'Εθνική μπάσκετ: Προετοιμασία για Mundobasket',
    'Basket League: Η βαθμολογία',
    'Μεταγραφές: Νέος παίκτης στην ομάδα',
    'Τελικός: Η μεγάλη μάχη',
    'Κύπελλο: Πρόκριση στους "4"',
    'Προπονητής: Νέα στρατηγική',
    'Triple-double: Εκπληκτική εμφάνιση',
    'Τραυματισμός: Ανησυχία για τον άσο',
    'Draft: Οι υποψήφιοι Έλληνες',
    'All-Star Game: Οι συμμετοχές'
  ],
  formula1: [
    'Max Verstappen: Νίκη στο GP του Μονακό',
    'Lewis Hamilton: Επιστροφή στην κορυφή',
    'Ferrari: Νέες αναβαθμίσεις',
    'Red Bull: Κυριαρχία στις κατατακτήριες',
    'Mercedes: Πρόβλημα με το μονοθέσιο',
    'McLaren: Ανοδική πορεία',
    'Ασφάλεια: Νέοι κανονισμοί FIA',
    'Πίστα: Επικίνδυνες συνθήκες',
    'Pole Position: Ρεκόρ χρόνου',
    'Pit Stop: Τέλειο γύρισμα',
    'Ατύχημα: Εγκατάλειψη του αγώνα',
    'Βαθμολογία: Η κατάταξη των οδηγών',
    'Κατασκευαστές: Η μάχη για τον τίτλο',
    'Ελαστικά: Στρατηγική επιλογή',
    'DRS: Η χρήση στον αγώνα'
  ],
  news: [
    'Ολυμπιακοί Αγώνες: Η προετοιμασία της Ελλάδας',
    'Ντόπινγκ: Νέο σκάνδαλο',
    'Αθλητισμός και Υγεία: Νέα έρευνα',
    'Χρηματοδότηση: Επενδύσεις σε αθλητικές εγκαταστάσεις',
    'Γυναικείος αθλητισμός: Η άνοδος',
    'Τηλεοπτικά δικαιώματα: Νέα συμφωνία',
    'Ακαδημίες: Το μέλλον των αθλητών',
    'Αθλητικός τουρισμός: Ανάπτυξη στην Ελλάδα',
    'Στοίχημα: Νέοι κανονισμοί',
    'Βράβευση: Οι κορυφαίοι αθλητές της χρονιάς',
    'Χορηγίες: Νέες συνεργασίες',
    'Εθελοντισμός: Προσφορά στον αθλητισμό',
    'Τεχνολογία: Οι καινοτομίες στον αθλητισμό',
    'Αθλητική ψυχολογία: Η σημασία της',
    'Διατροφή: Συμβουλές για αθλητές'
  ]
};

const greekSubtitles = [
  'Μια ιστορική στιγμή για την ομάδα',
  'Όλα όσα έγιναν στον αγώνα',
  'Εξελίξεις που άλλαξαν τα δεδομένα',
  'Αποκλειστικές πληροφορίες από τα αποδυτήρια',
  'Η ανάλυση των ειδικών',
];

const greekDescriptions = [
  'Σε έναν συναρπαστικό αγώνα γεμάτο συγκινήσεις και ανατροπές, η ομάδα κατάφερε να πάρει τη νίκη που χρειαζόταν. Οι παίκτες έδειξαν απίστευτο μαχητικό πνεύμα.',
  'Οι οπαδοί πανηγύρισαν με ενθουσιασμό την εμφάνιση της ομάδας τους. Η ατμόσφαιρα ήταν μοναδική και έδωσε επιπλέον κίνητρο στους παίκτες.',
  'Η προπόνηση της εβδομάδας απέδωσε καρπούς και φάνηκε στο γήπεδο. Η τακτική του προπονητή ήταν άψογη και οδήγησε στην επιτυχία.',
  'Πρόκειται για μια νίκη που θα μείνει στην ιστορία. Οι αθλητές υπερβήκαν τον εαυτό τους και πέτυχαν κάτι μοναδικό.',
  'Με εξαιρετικές ατομικές επιδόσεις και ομαδικό παιχνίδι, η ομάδα κατάφερε να ξεπεράσει όλα τα εμπόδια και να φτάσει στην κορυφή.',
];

// Sample YouTube videos for video embedding
const sampleYouTubeVideos = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  'https://www.youtube.com/watch?v=9bZkp7q19f0',
  'https://youtu.be/yPYZpwSpKmA',
  'https://www.youtube.com/watch?v=ZtYQ3oss3gk',
];

// Journalists data
const journalists = [
  {
    name: 'Γιώργος Παπαδόπουλος',
    slug: 'giorgos-papadopoulos',
    title: 'Αθλητικός Δημοσιογράφος',
    bio: 'Έμπειρος αθλητικός δημοσιογράφος με 15 χρόνια κάλυψης ποδοσφαίρου και μπάσκετ. Ειδικός στην τακτική ανάλυση και τις μεταγραφές.',
    specialty: 'Ποδόσφαιρο & Μπάσκετ',
    twitter: '@gpapadopoulos',
    instagram: '@gpapadopoulos_sports',
    email: 'g.papadopoulos@sportsholics.gr',
    isActive: true,
    priority: 10
  },
  {
    name: 'Μαρία Αντωνίου',
    slug: 'maria-antoniou',
    title: 'Ειδική Formula 1',
    bio: 'Ρεπόρτερ Formula 1 με διεθνή εμπειρία. Έχει καλύψει πάνω από 100 Grand Prix και έχει πάρει αποκλειστικές συνεντεύξεις από τους κορυφαίους οδηγούς.',
    specialty: 'Formula 1',
    twitter: '@mantoniou_f1',
    instagram: '@maria_f1_reporter',
    email: 'm.antoniou@sportsholics.gr',
    isActive: true,
    priority: 9
  },
  {
    name: 'Νίκος Καραγιάννης',
    slug: 'nikos-karagiannis',
    title: 'Αναλυτής & Σχολιαστής',
    bio: 'Πρώην επαγγελματίας αθλητής που στράφηκε στη δημοσιογραφία. Γνωστός για τις εμπεριστατωμένες αναλύσεις και τις προβλέψεις του.',
    specialty: 'Τακτική Ανάλυση',
    twitter: '@nkaragiannis',
    instagram: '@nikos_sports_analyst',
    email: 'n.karagiannis@sportsholics.gr',
    isActive: true,
    priority: 8
  }
];

// Helper functions
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function toRichText(text) {
  // Strapi v5 blocks format
  // Split text into paragraphs and convert to blocks
  const paragraphs = text.split('\n').filter(p => p.trim());
  return paragraphs.map(paragraph => ({
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text: paragraph.trim()
      }
    ]
  }));
}

// Convert text to Dynamic Zone format with optional video
function toDynamicZone(text, includeVideo = false) {
  const components = [];

  // Add text block with rich text content
  components.push({
    __component: 'article.text-block',
    content: toRichText(text)
  });

  // Randomly add a video embed (30% chance if includeVideo is true)
  if (includeVideo && Math.random() < 0.3) {
    components.push({
      __component: 'article.video-embed',
      videoUrl: randomItem(sampleYouTubeVideos),
      caption: 'Δείτε τα highlights'
    });

    // Add another text block after video
    components.push({
      __component: 'article.text-block',
      content: toRichText('Απίστευτη εμφάνιση από την ομάδα! Συνεχίζει την καλή της πορεία στο πρωτάθλημα.')
    });
  }

  return components;
}

async function uploadImage(imageName) {
  try {
    const imagePath = path.join(__dirname, '../public/demo-images', imageName);

    if (!fs.existsSync(imagePath)) {
      console.warn(`   ⚠️  Image not found: ${imageName}`);
      return null;
    }

    const form = new FormData();
    form.append('files', fs.createReadStream(imagePath));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ADMIN_JWT}`,
        ...form.getHeaders()
      },
      body: form
    });

    if (!response.ok) {
      console.warn(`   ⚠️  Failed to upload ${imageName}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data[0]?.id || null;
  } catch (error) {
    console.warn(`   ⚠️  Error uploading ${imageName}:`, error.message);
    return null;
  }
}

async function createEntry(endpoint, data, displayName) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_JWT}`
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`   ⚠️  Failed to create ${displayName}: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result.data?.id || result.data?.documentId || null;
  } catch (error) {
    console.error(`   ❌ Error creating ${displayName}:`, error.message);
    return null;
  }
}

// Main seeding function
async function seedProduction() {
  console.log('\n🌱 PRODUCTION SEED SCRIPT 🌱\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log(`🌐 Target URL: ${STRAPI_URL}\n`);

  console.log('📦 This will create demo/test data in PRODUCTION:\n');
  console.log('   - 3 Journalists');
  console.log('   - 15 Football Articles');
  console.log('   - 15 Basketball Articles');
  console.log('   - 15 Formula 1 Articles');
  console.log('   - 15 News Articles');
  console.log('   - 9 Blog Articles');
  console.log('   - 5 Breaking News Items');
  console.log('   - 1 Hero Section');
  console.log('   - Homepage Configuration\n');

  console.log('⚠️  Make sure PRODUCTION database is EMPTY before running!\n');

  console.log('🚀 Starting seed process...\n');

  const createdJournalists = [];
  const createdFootballIds = [];
  const createdBasketballIds = [];
  const createdFormula1Ids = [];
  const createdNewsIds = [];

  // 1. Create Journalists
  console.log('👥 Creating Journalists...\n');

  for (const journalist of journalists) {
    const journalistId = await createEntry('journalists', journalist, journalist.name);
    if (journalistId) {
      createdJournalists.push({
        id: journalistId,
        name: journalist.name,
        slug: journalist.slug
      });
      console.log(`   ✅ Created: ${journalist.name} (ID: ${journalistId})`);
    }
  }

  console.log(`\n   ✅ Created ${createdJournalists.length} journalists\n`);

  // 2-5. Create Articles for each sport
  const articleTypes = [
    { name: 'Football', endpoint: 'football-articles', titles: greekTitles.football, ids: createdFootballIds },
    { name: 'Basketball', endpoint: 'basketball-articles', titles: greekTitles.basketball, ids: createdBasketballIds },
    { name: 'Formula 1', endpoint: 'formula1-articles', titles: greekTitles.formula1, ids: createdFormula1Ids },
    { name: 'News', endpoint: 'news-articles', titles: greekTitles.news, ids: createdNewsIds }
  ];

  for (const articleType of articleTypes) {
    console.log(`⚽ Creating ${articleType.name} Articles...`);

    for (let i = 0; i < 15; i++) {
      // Assign journalist evenly (cycle through all journalists)
      const journalist = createdJournalists.length > 0
        ? createdJournalists[i % createdJournalists.length]
        : null;

      const article = {
        title: articleType.titles[i],
        subtitle: randomItem(greekSubtitles),
        content: toDynamicZone(randomItem(greekDescriptions), true),  // Dynamic Zone with optional video
        ...(journalist && { author: journalist.id }),
        slug: `${articleType.name.toLowerCase().replace(' ', '-')}-article-${i + 1}`,
        publishedAt: new Date().toISOString()
      };

      const articleId = await createEntry(articleType.endpoint, article, `${articleType.name} Article ${i + 1}`);
      if (articleId) {
        articleType.ids.push(articleId);
      }
    }

    console.log(`   ✅ Created ${articleType.ids.length}/15 ${articleType.name} articles\n`);
  }

  // 6. Create Blog Articles
  console.log('📝 Creating Blog Articles...');
  let blogCount = 0;

  if (createdJournalists.length === 0) {
    console.log('   ⚠️  Skipping blog articles (no journalists available)\n');
  } else {
    for (let i = 0; i < 9; i++) {
      // Assign journalist evenly (cycle through all journalists)
      const journalist = createdJournalists[i % createdJournalists.length];

      const blogArticle = {
        title: `Blog: ${randomItem(greekTitles.football)}`,
        subtitle: randomItem(greekSubtitles),
        content: toDynamicZone(randomItem(greekDescriptions) + ' ' + randomItem(greekDescriptions), true),  // Dynamic Zone with optional video
        journalist: journalist.id,
        slug: `blog-article-${i + 1}`,
        category: randomItem(['Ποδόσφαιρο', 'Μπάσκετ', 'Formula 1', 'Γενικά']),
        readTime: Math.floor(Math.random() * 10) + 3,
        publishedAt: new Date().toISOString()
      };

      const blogId = await createEntry('blog-articles', blogArticle, `Blog Article ${i + 1}`);
      if (blogId) blogCount++;
    }
    console.log(`   ✅ Created ${blogCount} blog articles\n`);
  }

  // 7. Create Breaking News
  console.log('📰 Creating Breaking News...');
  const breakingNewsItems = [
    { text: 'BREAKING: Ο Παναθηναϊκός κατακτά το πρωτάθλημα!', priority: 10 },
    { text: 'Αποκλειστικό: Μεταγραφική βόμβα στην Ελλάδα', priority: 9 },
    { text: 'Champions League: Ιστορική πρόκριση για τον ΠΑΟΚ', priority: 8 },
    { text: 'Formula 1: Ο Φερστάπεν κερδίζει το GP του Μονακό', priority: 7 },
    { text: 'NBA: Γιάννης Αντετοκούνμπο MVP της σεζόν', priority: 6 },
  ];

  for (const item of breakingNewsItems) {
    await createEntry('breaking-news-items', item, item.text.substring(0, 30));
  }
  console.log('   ✅ Created 5 breaking news items\n');

  // 8. Create Hero Section
  console.log('🎯 Creating Hero Section...');
  if (createdFootballIds.length > 0) {
    const heroSection = {
      title: 'Ο Παναθηναϊκός',
      titleHighlight: 'Νικητής του Ντέρμπι',
      description: 'Σε έναν συναρπαστικό αγώνα γεμάτο συγκινήσεις, ο Παναθηναϊκός κατάφερε να κερδίσει το μεγάλο ντέρμπι.',
      categoryLabel: 'ΠΟΔΟΣΦΑΙΡΟ',
      categoryEmoji: '⚽',
      timeAgo: 'πριν 2 ώρες',
      buttonText: 'Διαβάστε περισσότερα →',
      linkedFootballArticle: createdFootballIds[0],
      isActive: true
    };

    await createEntry('hero-sections', heroSection, 'Hero Section');
    console.log('   ✅ Created hero section\n');
  } else {
    console.log('   ⚠️  Skipping hero section (no football articles created)\n');
  }

  // 9. Create Homepage Configuration
  console.log('🏠 Creating Homepage Configuration...');
  const homepageConfig = {
    ...(createdFootballIds.length >= 2 && { carouselFootball: createdFootballIds.slice(0, 2) }),
    ...(createdBasketballIds.length >= 2 && { carouselBasketball: createdBasketballIds.slice(0, 2) }),
    ...(createdFormula1Ids.length >= 2 && { carouselFormula1: createdFormula1Ids.slice(0, 2) }),
    ...(createdFootballIds.length >= 4 && { mainNewsFootball: createdFootballIds.slice(2, 4) }),
    ...(createdBasketballIds.length >= 4 && { mainNewsBasketball: createdBasketballIds.slice(2, 4) }),
    ...(createdFormula1Ids.length >= 4 && { mainNewsFormula1: createdFormula1Ids.slice(2, 4) }),
    ...(createdNewsIds.length >= 2 && { mainNewsNews: createdNewsIds.slice(0, 2) })
  };

  await createEntry('homepage-configuration', homepageConfig, 'Homepage Configuration');
  console.log('   ✅ Created homepage configuration\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n✅ PRODUCTION SEED COMPLETE!');
  console.log('\n📊 Summary:');
  console.log(`   - ${createdJournalists.length} Journalists`);
  console.log(`   - ${createdFootballIds.length} Football Articles`);
  console.log(`   - ${createdBasketballIds.length} Basketball Articles`);
  console.log(`   - ${createdFormula1Ids.length} Formula 1 Articles`);
  console.log(`   - ${createdNewsIds.length} News Articles`);
  console.log(`   - Blog Articles, Breaking News, Hero Section, Homepage Config`);
  console.log('\n💡 All entries have been created!');
  console.log('💡 Go to Strapi admin to verify and publish if needed.\n');
}

// Validate production URL before running
if (STRAPI_URL.includes('localhost') || STRAPI_URL.includes('127.0.0.1')) {
  console.error('\n❌ ERROR: This script is for PRODUCTION only!');
  console.error('   The URL points to localhost. Use seed-all-data.js instead.\n');
  process.exit(1);
}

// Run the seed
seedProduction().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  console.error(error.stack);
  process.exit(1);
});
