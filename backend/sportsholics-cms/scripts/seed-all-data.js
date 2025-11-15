/**
 * Complete Seeding Script for Sports-holics CMS
 * Creates test data for all collection types
 * 
 * Usage:
 * 1. Create API token in Strapi admin
 * 2. Save token to scripts/strapi.token file
 * 3. Run: node scripts/seed-all-data.js
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

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

// Available images from frontend/public
const AVAILABLE_IMAGES = [
  '216-scaled-1.jpg',
  'BG-football-1600x1000-1170x600-1.jpeg',
];

// Get random image path
function getRandomImage() {
  return AVAILABLE_IMAGES[Math.floor(Math.random() * AVAILABLE_IMAGES.length)];
}

// Get MIME type from file extension
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return mimeTypes[ext] || 'image/jpeg';
}

// Upload image to Strapi
async function uploadImage(imageName) {
  try {
    const imagePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', imageName);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠️  Image not found: ${imageName}`);
      return null;
    }

    // Read file as buffer
    const fileBuffer = fs.readFileSync(imagePath);
    const mimeType = getMimeType(imageName);
    
    // Use FormData for multipart/form-data
    const formData = new FormData();
    formData.append('files', fileBuffer, {
      filename: imageName,
      contentType: mimeType
    });

    // Use axios which handles form-data streams properly
    const response = await axios.post(
      `${STRAPI_URL}/api/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${ADMIN_JWT}`
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].id || null;
    }
    return null;
  } catch (error) {
    if (error.response) {
      const errorText = JSON.stringify(error.response.data || error.response.statusText);
      console.warn(`⚠️  Failed to upload ${imageName}: ${error.response.status} - ${errorText.substring(0, 200)}`);
    } else {
      console.warn(`⚠️  Error uploading ${imageName}:`, error.message);
    }
    return null;
  }
}

// Greek article content for realistic testing
const greekTitles = {
  football: [
    'Ο Παναθηναϊκός κέρδισε με 2-1 τον Ολυμπιακό στο ντέρμπι',
    'Champions League: Ιστορική πρόκριση για τον ΠΑΟΚ',
    'Μεταγραφική βόμβα: Έρχεται σταρ στην Ελλάδα',
    'Εθνική Ελλάδας: Νίκη επί της Γαλλίας με 2-0',
    'ΑΕΚ: Ανακοίνωσε τρεις νέες μεταγραφές',
    'Super League: Αλλάζει το πρόγραμμα των αγώνων',
    'Ο Μέσι μίλησε για την καριέρα του στην Ελλάδα',
    'Κύπελλο Ελλάδας: Οι προημιτελικές αναμετρήσεις',
    'Τραυματισμός σοκ για τον αρχηγό του Παναθηναϊκού',
    'Νέος προπονητής στον Άρη Θεσσαλονίκης',
    'Premier League: Ο Σαλάχ έγινε ο κορυφαίος σκόρερ',
    'La Liga: Η Ρεάλ Μαδρίτης πήρε το El Clasico',
    'Bundesliga: Μπάγερν νικά και απομακρύνεται',
    'Serie A: Γκολ και θέαμα στο Μιλάνο',
    'UEFA: Νέοι κανονισμοί για τα ευρωπαϊκά ταξίδια'
  ],
  basketball: [
    'Ο Παναθηναϊκός νίκησε την Μπαρτσελόνα στην Euroleague',
    'NBA: Οι Λέικερς κέρδισαν τους Γουόριορς',
    'Εθνική Μπάσκετ: Προετοιμασία για το Ευρωμπάσκετ',
    'Ολυμπιακός: Triple-double από τον αρχηγό',
    'Basket League: Το πρόγραμμα της 15ης αγωνιστικής',
    'ΠΑΟΚ: Ανακοίνωσε Αμερικανό γκαρντ',
    'Euroleague: Top 10 στιγμές της εβδομάδας',
    'Γιάννης Αντετοκούνμπο: 45 πόντοι κόντρα στους Σέλτικς',
    'ΑΕΚ: Νέος προπονητής από τη Σερβία',
    'Κύπελλο Ελλάδας: Οι ημιτελικοί του Final 4',
    'NBA Draft: Έλληνες παίκτες στο draft',
    'Ευρωμπάσκετ: Το πρόγραμμα της Εθνικής',
    'Φενέρμπαχτσε: Διπλό στην Μόσχα',
    'Ζαλγκίρις: Νίκη με buzzer beater',
    'Α1 Γυναικών: Το Μαρούσι πρώτο'
  ],
  formula1: [
    'Formula 1: Ο Φερστάπεν νίκησε στο GP του Μονακό',
    'Red Bull: Παρουσίασε το νέο μονοθέσιο',
    'Mercedes: Τεχνικά προβλήματα στις δοκιμές',
    'Ferrari: Επιστροφή στις νίκες μετά από 3 χρόνια',
    'McLaren: Νέα συμφωνία με την Honda',
    'Aston Martin: Ο Αλόνσο παραμένει για 2 χρόνια',
    'GP Ιαπωνίας: Φερστάπεν pole position',
    'Πολ Ποζίσιον: Νέο ρεκόρ πίστας στο Σιλβερστόουν',
    'FIA: Αλλαγές στους τεχνικούς κανονισμούς',
    'Alpine: Γκασλί και Οκόν μάχονται για την pole',
    'Williams: Επιστροφή στη δόξα του παρελθόντος',
    'Haas: Αμερικανική ομάδα με ευρωπαϊκές φιλοδοξίες',
    'Safety Car: Αμφιλεγόμενη απόφαση στη Σιγκαπούρη',
    'Pirelli: Νέα γόμα για το 2024',
    'Κατασκευαστές: Η μάχη για τον τίτλο συνεχίζεται'
  ],
  news: [
    'Ελλάδα: Νέα μέτρα για την οικονομία',
    'Τεχνολογία: Η Apple παρουσίασε νέα προϊόντα',
    'Πολιτική: Συνάντηση των ηγετών της ΕΕ',
    'Υγεία: Νέα θεραπεία για τον καρκίνο',
    'Περιβάλλον: Δράσεις για την κλιματική αλλαγή',
    'Εκπαίδευση: Αλλαγές στο εκπαιδευτικό σύστημα',
    'Πολιτισμός: Νέα έκθεση στο Μουσείο Ακρόπολης',
    'Οικονομία: Άνοδος στο χρηματιστήριο',
    'Διεθνή: Συνομιλίες για την ειρήνη',
    'Επιστήμη: Ανακάλυψη νέου πλανήτη',
    'Κοινωνία: Εθελοντισμός για την Ελλάδα',
    'Ψυχαγωγία: Συναυλία διεθνούς καλλιτέχνη',
    'Τουρισμός: Ρεκόρ επισκεπτών το καλοκαίρι',
    'Αυτοκίνητο: Τα νέα ηλεκτρικά μοντέλα',
    'Τρόφιμα: Ελληνικά προϊόντα κατακτούν το εξωτερικό'
  ]
};

const greekSubtitles = [
  'Αναλυτική κάλυψη του γεγονότος',
  'Όλες οι λεπτομέρειες από τους ανταποκριτές μας',
  'Ρεπορτάζ από το στάδιο',
  'Συνέντευξη με τους πρωταγωνιστές',
  'Τι λένε οι ειδικοί',
  'Η ανάλυση των γεγονότων',
  'Backstage από τα αποδυτήρια',
  'Αποκλειστικές δηλώσεις',
  'Τα highlights της αναμέτρησης',
  'Πλήρης κάλυψη της είδησης',
];

const greekDescriptions = [
  'Σε έναν αγώνα γεμάτο συγκινήσεις και ανατροπές, η ομάδα κατάφερε να πάρει τη νίκη με εξαιρετική εμφάνιση. Οι παίκτες έδειξαν μεγάλη προσπάθεια και αφοσίωση, ενώ οι φίλαθλοι πανηγύρισαν ξέφρενα την επιτυχία.',
  'Μια ιστορική στιγμή για το ελληνικό άθλημα. Η ομάδα έγραψε ιστορία με την εμφάνισή της, αποδεικνύοντας ότι με σκληρή δουλειά και αποφασιστικότητα μπορούν να επιτευχθούν μεγάλα πράγματα.',
  'Οι εξελίξεις ήταν ραγδαίες και κράτησαν το κοινό σε αγωνία μέχρι το τελευταίο λεπτό. Η τακτική που ακολούθησε ο προπονητής απέδωσε καρπούς και η ομάδα έφτασε στο επιθυμητό αποτέλεσμα.',
  'Μια νίκη που θα μείνει στην ιστορία. Οι πρωταγωνιστές έδωσαν τον καλύτερο εαυτό τους, ενώ το κοινό τους ανταπέδωσε με θερμό χειροκρότημα. Η ατμόσφαιρα ήταν μοναδική και όλοι έζησαν στιγμές έντασης.',
  'Σε μια συναρπαστική αναμέτρηση, η ομάδα κατάφερε να ξεπεράσει τον αντίπαλο με εξαιρετικό παιχνίδι. Οι φίλαθλοι πανηγύρισαν την επιτυχία και οι παίκτες ευχαρίστησαν για τη στήριξη.',
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

// Helper function to make API calls
async function apiCall(endpoint, data) {
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
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.message);
    return null;
  }
}

// Random helper
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Strapi v5 uses Markdown for richtext fields, not JSON
// Just return the plain text and Strapi will handle it
function toRichText(text) {
  return text;
}

// Main seeding function
async function seedAllData() {
  console.log('🌱 Starting Complete Data Seeding...\n');
  console.log('═══════════════════════════════════════\n');

  // Check JWT token
  if (ADMIN_JWT === 'YOUR_JWT_TOKEN_HERE') {
    console.log('❌ ERROR: Please add your JWT token to the script!');
    console.log('\n📝 To get your JWT token:');
    console.log('1. Open Strapi admin: http://localhost:1337/admin');
    console.log('2. Open browser DevTools (F12)');
    console.log('3. Go to Application/Storage → Local Storage');
    console.log('4. Find "jwtToken" and copy its value');
    console.log('5. Replace ADMIN_JWT in this script\n');
    return;
  }

  // 1. Create Journalists
  console.log('👥 Creating Journalists...\n');
  const createdJournalists = [];
  
  for (const journalist of journalists) {
    const result = await apiCall('journalists', journalist);
    if (result && result.data) {
      createdJournalists.push(result.data);
      console.log(`✅ Created: ${journalist.name} (ID: ${result.data.id})`);
    }
  }
  console.log(`\n✅ Created ${createdJournalists.length} journalists\n`);

  // 2. Create Football Articles
  console.log('⚽ Creating Football Articles...\n');
  for (let i = 0; i < 15; i++) {
    // Upload random image
    const imageId = await uploadImage(getRandomImage());
    
    const article = {
      title: greekTitles.football[i],
      subtitle: randomItem(greekSubtitles),
      description: toRichText(randomItem(greekDescriptions)),
      author: 'Sports Holics',
      slug: `football-article-${i + 1}`,
      ...(imageId && { image: imageId })
    };
    
    const result = await apiCall('football-articles', article);
    if (result && result.data) {
      console.log(`✅ Football ${i + 1}/15: ${article.title.substring(0, 50)}...`);
    }
  }

  // 3. Create Basketball Articles
  console.log('\n🏀 Creating Basketball Articles...\n');
  for (let i = 0; i < 15; i++) {
    // Upload random image
    const imageId = await uploadImage(getRandomImage());
    
    const article = {
      title: greekTitles.basketball[i],
      subtitle: randomItem(greekSubtitles),
      description: toRichText(randomItem(greekDescriptions)),
      author: 'Sports Holics',
      slug: `basketball-article-${i + 1}`,
      ...(imageId && { image: imageId })
    };
    
    const result = await apiCall('basketball-articles', article);
    if (result && result.data) {
      console.log(`✅ Basketball ${i + 1}/15: ${article.title.substring(0, 50)}...`);
    }
  }

  // 4. Create Formula1 Articles
  console.log('\n🏎️  Creating Formula 1 Articles...\n');
  for (let i = 0; i < 15; i++) {
    // Upload random image
    const imageId = await uploadImage(getRandomImage());
    
    const article = {
      title: greekTitles.formula1[i],
      subtitle: randomItem(greekSubtitles),
      description: toRichText(randomItem(greekDescriptions)),
      author: 'Sports Holics',
      slug: `formula1-article-${i + 1}`,
      ...(imageId && { image: imageId })
    };
    
    const result = await apiCall('formula1-articles', article);
    if (result && result.data) {
      console.log(`✅ Formula1 ${i + 1}/15: ${article.title.substring(0, 50)}...`);
    }
  }

  // 5. Create News Articles
  console.log('\n📰 Creating News Articles...\n');
  for (let i = 0; i < 15; i++) {
    // Upload random image
    const imageId = await uploadImage(getRandomImage());
    
    const article = {
      title: greekTitles.news[i],
      subtitle: randomItem(greekSubtitles),
      description: toRichText(randomItem(greekDescriptions)),
      author: 'Sports Holics',
      slug: `news-article-${i + 1}`,
      ...(imageId && { image: imageId })
    };
    
    const result = await apiCall('news-articles', article);
    if (result && result.data) {
      console.log(`✅ News ${i + 1}/15: ${article.title.substring(0, 50)}...`);
    }
  }

  // 6. Create Blog Articles for Journalists
  if (createdJournalists.length > 0) {
    console.log('\n📝 Creating Blog Articles...\n');
    
    const blogTitles = [
      'Η τακτική ανάλυση του τελικού',
      'Οι καλύτερες στιγμές της σεζόν',
      'Συνέντευξη: Μέσα στα αποδυτήρια',
      'Προβλέψεις για τη νέα σεζόν',
      'Top 10 παίκτες του μήνα'
    ];

    for (const journalist of createdJournalists) {
      for (let i = 0; i < 3; i++) {
        // Upload random image
        const imageId = await uploadImage(getRandomImage());
        
        const blogArticle = {
          title: `${blogTitles[i]} - ${journalist.name}`,
          slug: `${journalist.slug}-blog-${i + 1}`,
          subtitle: randomItem(greekSubtitles),
          content: toRichText(randomItem(greekDescriptions)),
          excerpt: randomItem(greekSubtitles),
          category: randomItem(['Ποδόσφαιρο', 'Μπάσκετ', 'Formula 1', 'Ανάλυση']),
          tags: ['analysis', 'opinion', 'exclusive'],
          readTime: Math.floor(Math.random() * 10) + 3,
          isFeatured: i === 0,
          journalist: journalist.id,
          ...(imageId && { coverImage: imageId })
        };

        const result = await apiCall('blog-articles', blogArticle);
        if (result && result.data) {
          console.log(`✅ Blog by ${journalist.name}: ${blogArticle.title.substring(0, 40)}...`);
        }
      }
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log('\n✅ SEEDING COMPLETE!\n');
  console.log('📊 Summary:');
  console.log(`   - ${createdJournalists.length} Journalists`);
  console.log('   - 15 Football Articles');
  console.log('   - 15 Basketball Articles');
  console.log('   - 15 Formula 1 Articles');
  console.log('   - 15 News Articles');
  console.log(`   - ${createdJournalists.length * 3} Blog Articles`);
  console.log(`\n📝 Total: ${60 + createdJournalists.length + (createdJournalists.length * 3)} entries created\n`);
  console.log('⚠️  IMPORTANT: All articles are in DRAFT status!');
  console.log('   Go to Strapi admin and PUBLISH them to see on the website.\n');
}

// Run the seeding
seedAllData().catch(error => {
  console.error('\n❌ Fatal Error:', error);
  process.exit(1);
});

