import { Sequelize, Instance, SequelizeStatic, Model } from 'sequelize';

export type FlightModelType = ReturnType<typeof Flight>;

type FlightAttributes = {
  number: number,
  origin: string,
  destination: string,
  flight: string,
  duration: string,
  distance: string,
  price: number
};

type FlightInstance = Instance<FlightAttributes> & FlightAttributes;

export const Flight = (dbService: Sequelize, sequelize: SequelizeStatic) => {
  const attributes: SequelizeAttributes<FlightAttributes> = {
    number: {type: sequelize.INTEGER},
    origin: {type: sequelize.STRING(50)},
    destination: {type: sequelize.STRING(50)},
    flight: {type: sequelize.STRING(50)},
    duration: {type: sequelize.INTEGER},
    distance: {type: sequelize.INTEGER},
    price: {type: sequelize.INTEGER}
  };

  const Flight: Model<FlightInstance, FlightAttributes> = dbService.define(
    'Flight',
    attributes,
    {
      timestamps: false,
      tableName: 'flights'
    },
  ) as any;

  return Flight;
};

// Each flight has a flight number, an origin airport, a destination airport, an Flight, a flight duration, a flight distance, and a price.
