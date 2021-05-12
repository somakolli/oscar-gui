import { Injectable } from '@angular/core';
import {GeoPoint} from '../../models/geo-point';
import {RoutingType} from '../routing/routing.service';

export interface Route {
  geoPoints: GeoPoint[];
  routingType: RoutingType;
}

@Injectable({
  providedIn: 'root'
})
export class RoutingDataStoreService {
  routesToAdd = new Map<string, Route>();
  constructor() { }
}
