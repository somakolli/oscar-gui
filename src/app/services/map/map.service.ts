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
  getPosition(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        const lng = resp.coords.longitude;
        const lat = resp.coords.latitude;
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        this.itemStore.binaryItemsFinished$.subscribe(state => {
          if (state !== 0) {
            this.itemStore.distanceSortedItems = this.itemStore.binaryItems;
            this.itemStore.distanceSortedItems.sort((a: OscarMinItem, b: OscarMinItem): number => {
              const distanceA = Math.pow(lng - a.lon, 2) + Math.pow(lat - a.lat, 2);
              const distanceB = Math.pow(lng - b.lon, 2) + Math.pow(lat - b.lat, 2);
              return distanceA - distanceB;
            });
            console.log(this.itemStore.binaryItems);
            console.log(this.itemStore.distanceSortedItems);
          }
        });
      },
        err => {
          reject(err);
        });
    });
  }
}
