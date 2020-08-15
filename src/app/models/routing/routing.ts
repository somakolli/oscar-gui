import {GeoPoint} from '../geo-point';

export class CellInfo {
  id: number;
  leafletBoundary: number[];
  itemsBinary: string;
}

export class RoutingPath {
  path: number[];
<<<<<<< HEAD
  distance: number;
  itemCount: number;
  cellIds: number[];
  itemsBinary: string;
=======
  itemsBinary: string;
  distance: number;
  itemCount: number;
>>>>>>> store-data-in-components
  static getGeoPoints(route: number[]): GeoPoint[] {
    const geoPoints: GeoPoint[] = [];
    for (const point of route) {
      geoPoints.push(new GeoPoint(point[0], point[1]));
    }
    return geoPoints;
  }
}
