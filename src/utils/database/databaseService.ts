import Sequelize from 'sequelize';

import config from 'config/environment/service';

const { host, port, user, password, database, charset, collate, logging } = config.database;

export const databaseService = new Sequelize(database, user, password, {
  host,
  port: parseInt(port, 10),
  dialect: 'mssql',
  logging,
  dialectOptions: {
    encrypt: true,
  },
  timezone: '+4',
  operatorsAliases: Sequelize.Op as any,
  define: {
    freezeTableName: true,
    charset,
    collate,
  },
});
