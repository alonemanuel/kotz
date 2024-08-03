'use strict';

/**
 * fake-term service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fake-term.fake-term');
