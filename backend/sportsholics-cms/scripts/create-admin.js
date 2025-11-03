/**
 * Script to create an admin user in Strapi
 * 
 * Usage:
 *   node scripts/create-admin.js
 * 
 * Or via Railway CLI:
 *   railway run node scripts/create-admin.js
 */

const strapi = require('@strapi/strapi');

async function createAdmin() {
  const app = await strapi().load();
  
  try {
    // Check if admin users exist
    const adminUsers = await app.admin.services.user.findAll();
    
    if (adminUsers.length > 0) {
      console.log('ℹ️  Admin users already exist. Skipping creation.');
      console.log(`   Found ${adminUsers.length} admin user(s).`);
      await app.destroy();
      process.exit(0);
    }

    // Create default admin user
    console.log('🔧 Creating admin user...');
    const defaultAdmin = await app.admin.services.user.create({
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: 'admin',
      isActive: true,
    });

    // Assign Super Admin role
    const superAdminRole = await app.admin.services.role.getSuperAdmin();
    await app.admin.services.user.assignARole(defaultAdmin.id, superAdminRole.id);

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📋 Login credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin');
    console.log('');
    console.log('⚠️  Please change the default password after first login!');
    
    await app.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await app.destroy();
    process.exit(1);
  }
}

// Run the script
createAdmin();

