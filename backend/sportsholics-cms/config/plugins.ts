export default ({ env }: { env: (key: string, defaultValue?: string) => string }) => ({
  seo: {
    enabled: true,
  },
  ckeditor5: {
    enabled: true,
  },
  sentry: {
    enabled: true,
    config: {
      dsn: env('SENTRY_DSN', ''),
      sendMetadata: true,
      // Optional: Configure additional Sentry options
      init: {
        environment: env('NODE_ENV', 'development'),
        // Capture 100% of transactions for performance monitoring
        tracesSampleRate: 1.0,
      },
    },
  },
  // Documentation plugin disabled due to compatibility issues with Strapi v5
  // Use `npx strapi documentation:generate` to generate OpenAPI spec instead
  // documentation: {
  //   enabled: true,
  // },
});
