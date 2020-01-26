import { Sequelize, Instance, SequelizeStatic, Model } from 'sequelize';

export type AirlineModelType = ReturnType<typeof Airline>;

type AirlineAttributes = {
  name: string,
  abbr: string
};

type AirlineInstance = Instance<AirlineAttributes> & AirlineAttributes;

export const Airline = (dbService: Sequelize, sequelize: SequelizeStatic) => {
  const attributes: SequelizeAttributes<AirlineAttributes> = {
    name: {type: sequelize.STRING(50)},
    abbr: {type: sequelize.STRING(50)}
  };

  const Airline: Model<AirlineInstance, AirlineAttributes> = dbService.define(
    'Airline',
    attributes,
    {
      timestamps: false,
      tableName: 'airlines'
    },
  ) as any;

  return Airline;
};
