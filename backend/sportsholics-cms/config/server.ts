export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Trust proxy for Railway (HTTPS)
  proxy: true,
  // Enable trust for X-Forwarded-* headers
  trustProxy: true,
});
