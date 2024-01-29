// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://5d3b82f1aa67ad4e07f8e17fe7e2f0a8@o4506637500547072.ingest.sentry.io/4506637509197824',
  tracesSampleRate: 1,
  debug: false,
});
