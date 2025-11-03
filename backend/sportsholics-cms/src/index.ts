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
    // Note: Bootstrap script disabled for Strapi 5 compatibility
    // Strapi 5 admin services API has changed
    // Create admin user via /admin registration form instead
    strapi.log.info('ℹ️  Create your first admin user at /admin');
  },
};
