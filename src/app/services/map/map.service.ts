import { Injectable } from '@angular/core';
import {ItemStoreService} from '../data/item-store.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GeoPoint} from '../../models/geo-point';
import {BehaviorSubject} from 'rxjs';
import {ActiveRefinement} from '../../models/gui/refinement';
import {polyline} from 'leaflet';
declare var L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  _map = L.Map;
  markers = new Map<string, L.Marker>();
  private readonly _mapReady = new BehaviorSubject<boolean>(false);
  readonly onMapReady$ = this._mapReady.asObservable();
  route: L.Polyline = new L.polyline([], {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  });
  constructor(private itemStore: ItemStoreService) {

  }

  setView(lat: number, lng: number, zoom: number) {
    this._map.setView([lat, lng], zoom);
  }
  get bounds() {
    return this._map.getBounds();
  }
  get map() {
    return this._map;
  }
  setMarker(geoPoint: GeoPoint, name: string) {
    if (this.markers.has(name)) {
      this.markers.get(name).setLatLng([geoPoint.lat, geoPoint.lon]);
    } else {
      let marker = L.marker([geoPoint.lat, geoPoint.lon]).addTo(this.map).bindPopup(name).openPopup();
      this.markers.set(name, marker);
    }
  }
  setMapReady(condition: boolean) {
    this.route.addTo(this.map);
    this._mapReady.next(condition);
  }
  drawRoute(route: GeoPoint[]) {
    console.log(route);
    this.route.setLatLngs([]);
    for (const point of route) {
      this.route.addLatLng([point.lat, point.lon]);
    }
  }
}
