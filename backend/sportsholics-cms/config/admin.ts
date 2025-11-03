export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY') || env('APP_KEYS')?.split(',')[0] || '',
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Custom admin panel configuration
  url: env('ADMIN_URL', '/admin'),
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  forgotPassword: {
    from: env('EMAIL_FROM', 'noreply@sportsholics.com'),
    replyTo: env('EMAIL_REPLY_TO', 'support@sportsholics.com'),
  },
  // Custom branding
  title: 'Sports Holics CMS',
  // Favicon will be served from public/uploads/favicon.png if you add one
});
