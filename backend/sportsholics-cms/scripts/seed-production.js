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
const STRAPI_URL = process.env.PRODUCTION_STRAPI_URL || 'https://your-production-strapi-url.com';

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

// Available demo images (place these in public/demo-images/)
const AVAILABLE_IMAGES = [
  '216-scaled-1.jpg',
  'BG-football-1600x1000-1170x600-1.jpeg',
  'Ferrari_F1.jpg',
  'wp14783249.jpg',
  'formula.png',
  'apex.png',
  'basketball.png',
  'football.png',
  'images.jpeg',
  'news-2.png',
  'racing-car.png',
];

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

// Helper functions
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function toRichText(text) {
  return [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: text
        }
      ]
    }
  ];
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
      console.warn(`   Error: ${errorText}`);
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
  console.log('   - 15 Football Articles');
  console.log('   - 15 Basketball Articles');
  console.log('   - 15 Formula 1 Articles');
  console.log('   - 15 News Articles');
  console.log('   - 3 Journalists');
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
  console.log('👥 Creating Journalists...');
  const journalists = [
    { name: 'Γιώργος Παπαδόπουλος', slug: 'giorgos-papadopoulos', bio: 'Αθλητικός δημοσιογράφος με 15 χρόνια εμπειρίας' },
    { name: 'Μαρία Κωνσταντίνου', slug: 'maria-konstantinou', bio: 'Ειδικός σε θέματα ποδοσφαίρου και μπάσκετ' },
    { name: 'Δημήτρης Νικολάου', slug: 'dimitris-nikolaou', bio: 'Ανταποκριτής Formula 1 και μηχανοκίνητου αθλητισμού' }
  ];

  for (const journalist of journalists) {
    const avatarId = await uploadImage(randomItem(AVAILABLE_IMAGES));
    const data = {
      name: journalist.name,
      slug: journalist.slug,
      bio: journalist.bio,
      ...(avatarId && { avatar: avatarId })
    };

    const journalistId = await createEntry('journalists', data, journalist.name);
    if (journalistId) {
      createdJournalists.push({ id: journalistId, ...journalist });
    }
  }
  console.log(`   ✅ Created ${createdJournalists.length}/3 journalists\n`);

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
      const imageId = await uploadImage(randomItem(AVAILABLE_IMAGES));
      const randomJournalist = createdJournalists.length > 0 ? randomItem(createdJournalists) : null;

      const article = {
        title: articleType.titles[i],
        subtitle: randomItem(greekSubtitles),
        description: toRichText(randomItem(greekDescriptions)),
        ...(randomJournalist && { author: randomJournalist.id }),
        slug: `${articleType.name.toLowerCase().replace(' ', '-')}-article-${i + 1}`,
        ...(imageId && { image: imageId }),
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
  for (let i = 0; i < 9; i++) {
    const coverImageId = await uploadImage(randomItem(AVAILABLE_IMAGES));
    const randomJournalist = createdJournalists.length > 0 ? randomItem(createdJournalists) : null;

    if (!randomJournalist) continue;

    const blogArticle = {
      title: `Blog: ${randomItem(greekTitles.football)}`,
      subtitle: randomItem(greekSubtitles),
      content: toRichText(randomItem(greekDescriptions) + ' ' + randomItem(greekDescriptions)),
      journalist: randomJournalist.id,
      slug: `blog-article-${i + 1}`,
      category: randomItem(['Ποδόσφαιρο', 'Μπάσκετ', 'Formula 1', 'Γενικά']),
      readTime: Math.floor(Math.random() * 10) + 3,
      ...(coverImageId && { coverImage: coverImageId }),
      publishedAt: new Date().toISOString()
    };

    await createEntry('blog-articles', blogArticle, `Blog Article ${i + 1}`);
  }
  console.log('   ✅ Created blog articles\n');

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
    const heroImageId = await uploadImage(randomItem(AVAILABLE_IMAGES));

    const heroSection = {
      title: 'Ο Παναθηναϊκός',
      titleHighlight: 'Νικητής του Ντέρμπι',
      description: 'Σε έναν συναρπαστικό αγώνα γεμάτο συγκινήσεις, ο Παναθηναϊκός κατάφερε να κερδίσει το μεγάλο ντέρμπι.',
      categoryLabel: 'ΠΟΔΟΣΦΑΙΡΟ',
      categoryEmoji: '⚽',
      timeAgo: 'πριν 2 ώρες',
      buttonText: 'Διαβάστε περισσότερα →',
      linkedFootballArticle: createdFootballIds[0],
      isActive: true,
      ...(heroImageId && { backgroundImage: heroImageId })
    };

    await createEntry('hero-sections', heroSection, 'Hero Section');
    console.log('   ✅ Created hero section\n');
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
