'use strict';

/**
 * debate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::debate.debate');
