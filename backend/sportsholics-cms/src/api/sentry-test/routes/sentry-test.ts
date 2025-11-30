export default {
  routes: [
    {
      method: 'GET',
      path: '/sentry-test',
      handler: 'sentry-test.testError',
      config: {
        auth: false, // Allow public access for testing
      },
    },
  ],
};


