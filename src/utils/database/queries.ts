// import { databaseService } from 'utils/database';
//
// // Given an origin airport and a destination airport, find the fastest flight between them.
// async function fastestFlight(origin, airport) {
//   const result: any = await databaseService.query('SELECT MIN (SELECT * FROM Flights WHERE) ', {
//     type: databaseService.QueryTypes.SELECT,
//   });
// }
//
// // Given an origin airport, write a query that finds the cheapest flight to each destination airport.
// // Include the name and address of each airport, and the name and abbreviation of the airline.
// async function cheapestFlight() {
//   const result: any = await databaseService.query('', {
//     type: databaseService.QueryTypes.SELECT,
//   });
// }
//
// // Write a query that determines which airline has the fastest average flight speed,
// // based on flight speed = distance / duration.
//
// async function avgFlightSpeed() {
//   const result: any = await databaseService.query('', {
//     type: databaseService.QueryTypes.SELECT,
//   });
// }
