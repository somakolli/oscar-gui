import { Injectable } from '@angular/core';
import {GeoPoint} from '../../models/geo-point';

@Injectable({
  providedIn: 'root'
})
export class RoutingDataStoreService {
  routesToAdd = new Map<string, GeoPoint[]>();
  constructor() { }
}
