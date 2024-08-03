'use strict';

/**
 * fake-item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fake-item.fake-item');
