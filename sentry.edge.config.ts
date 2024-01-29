// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://5d3b82f1aa67ad4e07f8e17fe7e2f0a8@o4506637500547072.ingest.sentry.io/4506637509197824',
  tracesSampleRate: 1,
  debug: false,
});
