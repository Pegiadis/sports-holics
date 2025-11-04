export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',     // Local development
        'http://localhost:1337',     // Local Strapi admin
        'https://*.vercel.app',       // Vercel deployments
        // Add your production domain here:
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
      // Configure session cookies for production HTTPS proxy
      // Set secure to false when using a reverse proxy that handles HTTPS
      cookie: {
        secure: false, // Set to true if not using a reverse proxy
        sameSite: 'lax',
        httpOnly: true,
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
