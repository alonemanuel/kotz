'use strict';

/**
 * fake-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fake-item.fake-item');
