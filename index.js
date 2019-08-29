import Geolib from "geolib";
import { getQueryForInBox } from "geo-queries";

export function findNearby(objects, center, radius, sortAscending = false) {
  const filteredObjects = objects.filtered(
    getQueryForInBox(center, radius, "latitude", "longitude")
  );

  if (sortAscending) {
    return sortByDistance(filteredObjects, center);
  }
  return filteredObjects;
}

export function sortByDistance(objects, coordinate) {
  return objects
    .map(object => {
      object.distance = Geolib.getDistanceSimple(coordinate, object.coordinate);
      return object;
    })
    .sort((a, b) => a.distance - b.distance);
}

export default {
  findNearby,
  sortByDistance
};
