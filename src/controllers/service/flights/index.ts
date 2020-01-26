import { Request, Response } from 'express';
import { createSuccessListResponse, createErrorResponse } from 'utils/response';
import { messages } from 'constants/messages';
import * as FLIGHTS_LIST from './flights.json';
const CARRIER_PREF_MULTIPLIER = 0.9;

type Flight = {
  departureTime: string,
  arrivalTime: string,
  carrier: string,
  origin: string,
  destination: string,
}

export async function getFlights(req: Request, res: Response) {
  try {
    const {preferences, minDuration, maxDuration, maxDistance} = req.query;
    const result = getPreferredFlight(FLIGHTS_LIST.list, preferences, minDuration, maxDuration, maxDistance);
    createSuccessListResponse(res, 200, {List: result});
  } catch (err) {
    createErrorResponse(req, res, 500, messages.service.failed, err);
  }
}

/**
 * getPreferredFlight
 * @param flights
 * @param preferences
 * @param minDuration
 * @param maxDuration
 * @param maxDistance
 */

function getPreferredFlight(
  flights: Array<Flight>,
  preferences: Array<string>, // [ 'UA', 'AA', 'DL' ]
  minDuration: number, // hours
  maxDuration: number, // hours
  maxDistance: number  // miles
) {
  // Filter out all flights that are outside the preferred time range and duration
  const filteredFlights = flights.filter((flight: Flight) => {
    return getDistanceBetweenAirports(flight.origin, flight.destination) < maxDistance &&
      inRange(minDuration, maxDuration, absoluteTime(flight.arrivalTime, flight.departureTime));
  });
  return filteredFlights.sort((flight: Flight) => (maxDuration - minDuration) *
    (preferences.includes(flight.carrier) ? CARRIER_PREF_MULTIPLIER : 1) + getDistanceBetweenAirports(flight.origin, flight.destination));
}


/**
 * getDistanceBetweenAirports (origin: string, destination: string): number
 * @param origin
 * @param destination
 */

function getDistanceBetweenAirports (origin: string, destination: string): number {
  return 150;
}

/**
 * absoluteTime (arrivalTime: string, departureTime: string): number
 * @param arrivalTime
 * @param departureTime
 */

function absoluteTime (arrivalTime: string, departureTime: string): number {
  const lastDay = new Date(arrivalTime).getTime();
  const now = new Date(departureTime).getTime();
  const hourDiff = lastDay - now;
  return hourDiff / 3600 / 1000;
}

/**
 * inRange(min: number, max: number, value: number): boolean)
 * @param min
 * @param max
 * @param value
 */

function inRange (min: number, max: number, value: number): boolean {
  return min <= value && value <= max;
}
