import {GeoPoint} from './geo-point';

export class RoutingMarker {
  color: string;
  geoPoint: GeoPoint;
  name: string;
  leafletId?: number;
}
