export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Trust proxy for production deployments behind reverse proxy
  proxy: env.bool('STRAPI_PROXY', false),
  trustProxy: env.bool('STRAPI_PROXY', false),
});
