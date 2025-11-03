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
    const adminUsers = await strapi.admin.services.user.findAll();
    
    if (adminUsers.length === 0) {
      try {
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

        strapi.log.info('✅ Default admin user created:');
        strapi.log.info('   Email: admin@example.com');
        strapi.log.info('   Password: admin');
        strapi.log.warn('⚠️  Please change the default password after first login!');
      } catch (error) {
        strapi.log.error('❌ Error creating default admin user:', error);
      }
    }
  },
};
