module.exports = [
  'strapi::logger',
  'strapi::errors',
  /* Beginning of snippet */
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'kotz-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'kotz-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  }, 'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
