'use strict';

const bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "startup" });
const { sequelize } = require('./postgres/models');

const syncTables = (cleanStart) => {
  log.info({}, 'SYNCING TABLES');
  return sequelize.sync({force:cleanStart}).then(log.info('Tables are synced')).catch(error => log.error({ error }, 'Error Syncing Tables'))
}

module.exports = { syncTables }