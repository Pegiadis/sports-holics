/**
 * Custom environment loader for Strapi
 * This script loads .env file and overrides system environment variables
 * ensuring that .env file takes precedence over system variables
 */

const fs = require('fs');
const path = require('path');

// Path to .env file
const envPath = path.join(__dirname, '.env');

console.log('🔧 Loading environment from .env file...');

if (fs.existsSync(envPath)) {
  // Read .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Parse .env file
  const envVars = {};
  envContent.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim() === '' || line.trim().startsWith('#')) {
      return;
    }
    
    // Parse KEY=VALUE
    const match = line.match(/^\s*([^=]+?)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      
      envVars[key] = value;
      
      // Override system environment variable with .env file value
      process.env[key] = value;
    }
  });
  
  console.log('✅ Environment loaded from .env file:');
  console.log(`   - DATABASE_CLIENT: ${process.env.DATABASE_CLIENT}`);
  console.log(`   - DATABASE_NAME: ${process.env.DATABASE_NAME}`);
  console.log(`   - DATABASE_HOST: ${process.env.DATABASE_HOST}`);
  console.log(`   - DATABASE_PORT: ${process.env.DATABASE_PORT}`);
  console.log('');
} else {
  console.warn('⚠️  No .env file found at:', envPath);
  console.log('');
}


