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
        'https://*.railway.app',      // Railway deployments (wildcard)
        'https://sincere-gentleness-production-b689.up.railway.app',  // Backend Railway URL
        'https://sports-holics-production.up.railway.app',  // Frontend Railway URL
        env('RAILWAY_PUBLIC_DOMAIN') ? `https://${env('RAILWAY_PUBLIC_DOMAIN')}` : null,
        // Add your custom domain here once you set it up:
        // 'https://yourdomain.com',
        // 'https://www.yourdomain.com',
      ].filter(Boolean), // Remove null values
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
