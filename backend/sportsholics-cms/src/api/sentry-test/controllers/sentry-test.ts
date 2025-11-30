/**
 * Sentry test controller
 * Use this endpoint to verify Sentry is capturing errors correctly
 */

export default {
  async testError(ctx) {
    // This will throw an error that Sentry should capture
    throw new Error('🚨 Sentry Test Error - If you see this in Sentry, it is working!');
  },
};


