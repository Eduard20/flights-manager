import { databaseService } from 'utils/database';
import sequelize from 'sequelize';
import { Airport } from './Airport';
import { Flight } from './Flight';
import { Airline } from './Airline';

const db = {
  Airport: Airport(databaseService, sequelize),
  Flight: Flight(databaseService, sequelize),
  Airline: Airline(databaseService, sequelize),
};

Object.keys(db).forEach((modelName) => {
  const internalDb: any = db;
  if (internalDb[modelName].associate) {
    internalDb[modelName].associate(db);
  }
});

// @ts-ignore
db.sequelize = databaseService;

export { db, db as default };
