import {GeoPoint} from '../geo-point';

export class RoutingPath {
  path: number[];
  itemsBinary: string;
  distance: number;
  itemCount: number;
  static getGeoPoints(route: number[]): GeoPoint[] {
    const geoPoints: GeoPoint[] = [];
    for (const point of route) {
      geoPoints.push(new GeoPoint(point[0], point[1]));
    }
    return geoPoints;
  }
}
