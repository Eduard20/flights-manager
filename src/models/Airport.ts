import { Sequelize, Instance, SequelizeStatic, Model } from 'sequelize';

export type AirportModelType = ReturnType<typeof Airport>;

type AirportAttributes = {
  name: string,
  code: string,
  address: string
};

type AirportInstance = Instance<AirportAttributes> & AirportAttributes;

export const Airport = (dbService: Sequelize, sequelize: SequelizeStatic) => {
  const attributes: SequelizeAttributes<AirportAttributes> = {
    name: {type: sequelize.STRING(50)},
    code: {type: sequelize.STRING(3)},
    address: {type: sequelize.STRING(255)}
  };

  const Airport: Model<AirportInstance, AirportAttributes> = dbService.define(
    'Airport',
    attributes,
    {
      timestamps: false,
      tableName: 'airports'
    },
  ) as any;

  return Airport;
};
