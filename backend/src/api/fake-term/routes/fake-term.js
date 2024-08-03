'use strict';

/**
 * fake-term router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fake-term.fake-term');
