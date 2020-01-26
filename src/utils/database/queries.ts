import { databaseService } from 'utils/database';

// Given an origin airport and a destination airport, find the fastest flight between them.
export function getFastestFlight(origin: string, destination: string) {
  const sqlQuery = `SELECT * FROM flights 
  WHERE duration=(SELECT MIN(duration) FROM flights) 
  AND origin='${origin}' AND destination='${destination}'`;
  return databaseService.query(sqlQuery, {
    type: databaseService.QueryTypes.SELECT
  });
}

// Given an origin airport, write a query that finds the cheapest flight to each destination airport.
// Include the name and address of each airport, and the name and abbreviation of the airline.
export function getCheapestFlight(origin: string) {
  const sqlQuery = `SELECT flights.destination, airlines.abbr, airports.name, airports.address, MIN(flights.price) as price FROM flights
    LEFT JOIN airports ON flights.destination=airports.code
    LEFT JOIN airlines ON flights.airline=airlines.name
    WHERE flights.origin='${origin}'
    GROUP BY flights.destination, airlines.abbr, airports.name, airports.address`;
  return databaseService.query(sqlQuery, {
    type: databaseService.QueryTypes.SELECT,
  });
}

// Write a query that determines which airline has the fastest average flight speed,
// based on flight speed = distance / duration.

export async function getFastestAvgSpeed() {
  const sqlQuery = `SELECT TOP 1 airline FROM 
  (SELECT airline, AVG(distance/duration) as average from flights GROUP BY airline) AS Temp ORDER BY average DESC`;
  return databaseService.query(sqlQuery, {
    type: databaseService.QueryTypes.SELECT,
  });
}
