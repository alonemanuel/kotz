'use strict';

/**
 * fake-item router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fake-item.fake-item');
