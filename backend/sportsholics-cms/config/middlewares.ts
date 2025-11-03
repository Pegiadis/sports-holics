export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',     // Local development
        'https://*.vercel.app',       // Vercel deployments
        // Add your custom domain here once you set it up:
        // 'https://yourdomain.com',
        // 'https://www.yourdomain.com',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      // Configure session cookies for Railway HTTPS proxy
      // Railway provides HTTPS, so we trust the proxy headers
      cookie: {
        // Set secure to false if X-Forwarded-Proto is not detected
        // Railway will forward HTTPS as X-Forwarded-Proto: https
        secure: process.env.NODE_ENV === 'production' && process.env.TRUST_PROXY !== 'false',
        sameSite: 'lax',
        httpOnly: true,
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
