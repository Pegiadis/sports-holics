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
      // Railway terminates HTTPS at the edge, connection to container is HTTP
      // So we set secure to false for production (Railway handles HTTPS)
      cookie: {
        secure: false, // Railway handles HTTPS at the edge
        sameSite: 'lax',
        httpOnly: true,
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
