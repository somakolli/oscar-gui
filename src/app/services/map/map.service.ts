import { Injectable } from '@angular/core';
import {ItemStoreService} from '../data/item-store.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
declare var L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: L.Map;

  constructor(private itemStore: ItemStoreService) { }

  setView(lat: number, lng: number, zoom: number) {
    this.map.setView([lat, lng], zoom);
  }
  get bounds() {
    return this.map.getBounds();
  }
}
