/**
 * Team Seed Script for Sports-holics CMS
 * Populates database with Greek sports teams
 *
 * Usage:
 * node scripts/seed-teams.js
 *
 * Requirements:
 * - Strapi server running at http://localhost:1337
 * - Create a file: scripts/strapi_local.token (or strapi_stage.token for production)
 * - Paste your Strapi API token (Full Access) inside it
 */

const fs = require('fs');
const path = require('path');

// Strapi URL - defaults to local, can be overridden with env var
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Read token from file
let ADMIN_JWT = '';
try {
  // Try local token first, then stage token
  const localTokenPath = path.join(__dirname, 'strapi_local.token');
  const stageTokenPath = path.join(__dirname, 'strapi_stage.token');
  
  if (fs.existsSync(localTokenPath)) {
    ADMIN_JWT = fs.readFileSync(localTokenPath, 'utf8').trim();
    console.log('📝 Using local token');
  } else if (fs.existsSync(stageTokenPath)) {
    ADMIN_JWT = fs.readFileSync(stageTokenPath, 'utf8').trim();
    console.log('📝 Using stage token');
  } else {
    throw new Error('No token file found');
  }
} catch (error) {
  console.error('❌ Error reading token file:', error.message);
  console.log('\n📝 Please create a file: scripts/strapi_local.token');
  console.log('   and paste your Strapi API token inside it.\n');
  process.exit(1);
}

// Multi-sport teams (teams that have both football and basketball)
const multiSportTeams = [
  {
    name: 'Παναθηναϊκός',
    slug: 'panathinaikos',
    hasFootball: true,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Παναθηναϊκός Αθλητικός Όμιλος - Ιστορικός σύλλογος της Αθήνας με πλούσια ιστορία στο ελληνικό ποδόσφαιρο και μπάσκετ. 6 φορές πρωταθλητής Ευρώπης στο μπάσκετ.',
    priority: 10,
    isActive: true,
  },
  {
    name: 'Ολυμπιακός',
    slug: 'olympiacos',
    hasFootball: true,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Ολυμπιακός Σύνδεσμος Φιλάθλων Πειραιώς - Ο πιο πολυπρωταθλητής σύλλογος της Ελλάδας στο ποδόσφαιρο. 3 Euroleague στο μπάσκετ.',
    priority: 10,
    isActive: true,
  },
  {
    name: 'ΑΕΚ',
    slug: 'aek',
    hasFootball: true,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Αθλητική Ένωση Κωνσταντινούπολης - Ιστορικός σύλλογος με ρίζες από την Κωνσταντινούπολη, με ισχυρή παρουσία και στα δύο αθλήματα.',
    priority: 9,
    isActive: true,
  },
  {
    name: 'ΠΑΟΚ',
    slug: 'paok',
    hasFootball: true,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Πανθεσσαλονίκειος Αθλητικός Όμιλος Κωνσταντινουπολιτών - Ο μεγαλύτερος σύλλογος της Θεσσαλονίκης με δραστηριότητα σε πολλά αθλήματα.',
    priority: 9,
    isActive: true,
  },
  {
    name: 'Άρης',
    slug: 'aris',
    hasFootball: true,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Άρης Θεσσαλονίκης - Ιστορικός σύλλογος της Θεσσαλονίκης με παράδοση σε ποδόσφαιρο και μπάσκετ.',
    priority: 8,
    isActive: true,
  },
];

// Football-only teams
const footballOnlyTeams = [
  {
    name: 'Ατρόμητος',
    slug: 'atromitos',
    hasFootball: true,
    hasBasketball: false,
    hasAutoMoto: false,
    description: 'Ατρόμητος Αθηνών - Σύλλογος με έδρα το Περιστέρι.',
    priority: 5,
    isActive: true,
  },
  {
    name: 'Αστέρας Τρίπολης',
    slug: 'asteras-tripolis',
    hasFootball: true,
    hasBasketball: false,
    hasAutoMoto: false,
    description: 'Αστέρας Τρίπολης - Σύλλογος από την Τρίπολη Αρκαδίας.',
    priority: 5,
    isActive: true,
  },
  {
    name: 'ΟΦΗ',
    slug: 'ofi',
    hasFootball: true,
    hasBasketball: false,
    hasAutoMoto: false,
    description: 'Όμιλος Φιλάθλων Ηρακλείου - Ο μεγαλύτερος σύλλογος της Κρήτης.',
    priority: 5,
    isActive: true,
  },
  {
    name: 'Βόλος ΝΠΣ',
    slug: 'volos',
    hasFootball: true,
    hasBasketball: false,
    hasAutoMoto: false,
    description: 'Νέος Ποδοσφαιρικός Σύλλογος Βόλου.',
    priority: 4,
    isActive: true,
  },
  {
    name: 'Λαμία',
    slug: 'lamia',
    hasFootball: true,
    hasBasketball: false,
    hasAutoMoto: false,
    description: 'ΠΑΣ Λαμία 1964 - Σύλλογος από τη Λαμία.',
    priority: 4,
    isActive: true,
  },
];

// Basketball-only teams
const basketballOnlyTeams = [
  {
    name: 'Περιστέρι',
    slug: 'peristeri-bc',
    hasFootball: false,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Περιστέρι ΓΣ - Σύλλογος με έδρα το Περιστέρι.',
    priority: 5,
    isActive: true,
  },
  {
    name: 'Προμηθέας Πατρών',
    slug: 'promitheas-patras',
    hasFootball: false,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Προμηθέας Πατρών - Ανερχόμενη δύναμη στο ελληνικό μπάσκετ.',
    priority: 6,
    isActive: true,
  },
  {
    name: 'Λαύριο',
    slug: 'lavrio-bc',
    hasFootball: false,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Λαύριο BC - Σύλλογος από το Λαύριο Αττικής.',
    priority: 5,
    isActive: true,
  },
  {
    name: 'Κολοσσός Ρόδου',
    slug: 'kolossos-rodou',
    hasFootball: false,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Κολοσσός Ρόδου - Σύλλογος από τη Ρόδο.',
    priority: 4,
    isActive: true,
  },
  {
    name: 'Ηρακλής',
    slug: 'iraklis-bc',
    hasFootball: false,
    hasBasketball: true,
    hasAutoMoto: false,
    description: 'Ηρακλής Θεσσαλονίκης - Ιστορικός σύλλογος στο ελληνικό μπάσκετ.',
    priority: 5,
    isActive: true,
  },
];

// All teams combined
const allTeams = [...multiSportTeams, ...footballOnlyTeams, ...basketballOnlyTeams];

// API helper function
async function apiCall(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_JWT}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to create ${endpoint}:`, error.message);
    return null;
  }
}

// Check if team already exists
async function teamExists(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/teams?filters[slug][$eq]=${slug}`,
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_JWT}`,
        },
      }
    );

    if (!response.ok) return false;

    const data = await response.json();
    return data.data && data.data.length > 0;
  } catch (error) {
    return false;
  }
}

// Main seed function
async function seedTeams() {
  console.log('\n🏆 Starting Team Seed Script');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log('='.repeat(50));

  let created = 0;
  let skipped = 0;

  for (const team of allTeams) {
    // Check if team already exists
    const exists = await teamExists(team.slug);
    
    if (exists) {
      console.log(`⏭️  Skipping ${team.name} (already exists)`);
      skipped++;
      continue;
    }

    // Create team
    const result = await apiCall('teams', team);
    
    if (result) {
      const sports = [];
      if (team.hasFootball) sports.push('Ποδόσφαιρο');
      if (team.hasBasketball) sports.push('Μπάσκετ');
      if (team.hasAutoMoto) sports.push('Auto Moto');
      const sportsStr = sports.join(', ');
      console.log(`✅ Created: ${team.name} (${sportsStr})`);
      created++;
      
      // Publish the team
      try {
        const publishResponse = await fetch(
          `${STRAPI_URL}/api/teams/${result.data.documentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ADMIN_JWT}`,
            },
            body: JSON.stringify({
              data: {
                publishedAt: new Date().toISOString(),
              },
            }),
          }
        );
        
        if (publishResponse.ok) {
          console.log(`   📢 Published: ${team.name}`);
        }
      } catch (publishError) {
        console.log(`   ⚠️  Could not publish: ${team.name}`);
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Summary:`);
  console.log(`   ✅ Created: ${created} teams`);
  console.log(`   ⏭️  Skipped: ${skipped} teams (already existed)`);
  console.log(`   📝 Total: ${allTeams.length} teams`);
  console.log(`\n   🏟️  Multi-sport teams: ${multiSportTeams.length}`);
  console.log(`   ⚽ Football-only teams: ${footballOnlyTeams.length}`);
  console.log(`   🏀 Basketball-only teams: ${basketballOnlyTeams.length}`);
  console.log('\n🎉 Team seeding complete!\n');
}

// Run the script
seedTeams().catch(console.error);
