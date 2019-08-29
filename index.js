import Geolib from 'geolib';
import { GeoQuery, GeoRegion, QueryBuilderInstance } from 'geo-queries';

export function findNearby(objects, center, radius, sortAscending = false) {
  const geoQuery = new GeoQuery(center, radius);
  const filteredObjects = objects.filtered(geoQuery.getInBox());

  if (sortAscending) {
    return sortByDistance(filteredObjects, center);
  }
  return filteredObjects;
}

export function findInBox(objects, box, sortAscending = false) {
  const geoRegion = new GeoRegion();
  geoRegion.setGeoBox(box);
  const filteredObjects = objects.filtered(
    QueryBuilderInstance.forInBox(geoRegion.getGeoBox())
  );

  if (sortAscending) {
    return sortByDistance(filteredObjects, geoRegion.getCenter());
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
  findInBox,
  sortByDistance
};
