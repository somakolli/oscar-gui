import {GeoPoint} from '../geo-point';

export class RoutingPath {
  path: number[];
  cellIds: number[];
  static getGeoPoints(route: number[]): GeoPoint[] {
    console.log(route);
    const geoPoints: GeoPoint[] = [];
    for (let i = 0; i < route.length - 1; i = i + 2 ) {
      geoPoints.push(new GeoPoint(route[i], route[i + 1]));
    }
    return geoPoints;
  }
}
