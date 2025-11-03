export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Create default admin user if none exists
    // Wrap in try-catch to prevent bootstrap from blocking startup
    try {
      // Wait longer for Strapi to fully initialize (database, admin services, etc.)
      strapi.log.info('⏳ Waiting for Strapi to fully initialize...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check if admin services are available
      if (!strapi.admin || !strapi.admin.services || !strapi.admin.services.user) {
        strapi.log.warn('⚠️  Admin services not ready yet. Skipping admin creation.');
        strapi.log.warn('⚠️  You can create an admin user via the registration form at /admin');
        return;
      }
      
      let adminUsers;
      try {
        adminUsers = await strapi.admin.services.user.findAll();
      } catch (error) {
        strapi.log.error('❌ Error checking for admin users:', error);
        strapi.log.warn('⚠️  You can create an admin user via the registration form at /admin');
        return;
      }
      
      if (adminUsers.length === 0) {
        try {
          strapi.log.info('🔧 No admin users found. Creating default admin...');
          
          // Create default admin user
          const defaultAdmin = await strapi.admin.services.user.create({
            firstname: 'Admin',
            lastname: 'User',
            email: 'admin@example.com',
            password: 'admin',
            isActive: true,
          });

          // Assign Super Admin role
          const superAdminRole = await strapi.admin.services.role.getSuperAdmin();
          await strapi.admin.services.user.assignARole(defaultAdmin.id, superAdminRole.id);

          strapi.log.info('✅ Default admin user created successfully!');
          strapi.log.info('   Email: admin@example.com');
          strapi.log.info('   Password: admin');
          strapi.log.warn('⚠️  Please change the default password after first login!');
        } catch (error) {
          strapi.log.error('❌ Error creating default admin user:', error);
          strapi.log.error('   Error details:', error.message || error);
          strapi.log.warn('⚠️  You can create an admin user via the registration form at /admin');
          strapi.log.warn('⚠️  Make sure ENCRYPTION_KEY is set in Railway environment variables!');
        }
      } else {
        strapi.log.info(`ℹ️  Found ${adminUsers.length} existing admin user(s). Skipping creation.`);
      }
    } catch (error) {
      // Don't block startup if bootstrap fails
      strapi.log.error('❌ Bootstrap error (non-blocking):', error);
      strapi.log.error('   Error details:', error.message || error);
      strapi.log.warn('⚠️  Strapi will continue to start. You can create an admin user via /admin');
      strapi.log.warn('⚠️  Make sure all required environment variables are set in Railway!');
    }
  },
};
