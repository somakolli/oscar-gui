import {GeoPoint} from '../geo-point';

export class CellInfo {
  id: number;
  leafletBoundary: number[];
  itemsBinary: string;
}

export class RoutingPath {
  path: number[];
  distance: number;
  itemCount: number;
  cellIds: number[];
  itemsBinary: string;
  static getGeoPoints(route: number[]): GeoPoint[] {
    const geoPoints: GeoPoint[] = [];
    for (const point of route) {
      geoPoints.push(new GeoPoint(point[0], point[1]));
    }
    return geoPoints;
  }
}
