import { Injectable } from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {ItemStoreService} from './item-store.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  gridMap = new Map<string, number[]>();
  gridSizeY = 3600;
  gridSizeX = 1800;
  // divide lat and long fields by gridSize lat = [-90, +90] long = [-180,180]
  divLat = 180 / this.gridSizeX;
  divLon = 360 / this.gridSizeY;
  constructor(private itemStore: ItemStoreService) { }
  buildGrid() {
    this.gridMap = new Map<string, number[]>();
    for (let i = 0; i < this.itemStore.binaryItems.length; i++) {
      const item = this.itemStore.binaryItems[i];
      const latGridPos = this.getLatPositionInGrid(item.lat);
      const lonGridPos = this.getLonPositionInGrid(item.lon);
      if (!this.gridMap.has(JSON.stringify({lat: latGridPos, lon: lonGridPos}))) {
        this.gridMap.set(JSON.stringify({lat: latGridPos, lon: lonGridPos}), new Array<number>());
      }
      this.gridMap.get(JSON.stringify({lat: latGridPos, lon: lonGridPos})).push(i);
    }
  }
  getItems(minLat: number, minLon: number, maxLat: number, maxLon: number): Map<string, number[]> {
    const bbox = {
      minLonPos : ( (minLon) / this.divLon),
      minLatPos : ( (minLat) / this.divLat),
      maxLonPos : ( (maxLon) / this.divLon),
      maxLatPos : ( (maxLat) / this.divLat)
    };
    const items = new Map<string, number[]>();
    this.gridMap.forEach((value, key) => {
      const keyObj = JSON.parse(key) as {lat: number, lon: number};
      if (keyObj.lat >= bbox.minLatPos - 1 && keyObj.lon >= bbox.minLonPos - 1 &&
        keyObj.lat <= bbox.maxLatPos && keyObj.lon <= bbox.maxLonPos) {
        if (keyObj.lat < bbox.minLatPos || keyObj.lon < bbox.minLonPos || keyObj.lat > bbox.maxLatPos - 1) {
          value.forEach( itemPosition => {
            const item = this.itemStore.binaryItems[itemPosition];
            if (item.lat >= minLat && item.lon >= minLon && item.lat <= maxLat && item.lon <= maxLon) {
              if (items.has(key)) {
                items.get(key).push(itemPosition);
              } else {
                items.set(key, new Array<number>());
                items.get(key).push(itemPosition);
              }
            }
          });
        } else {
          items.set(key, value);
        }
      }
    });
    return items;
  }
  getLatPositionInGrid(lat: number): number {
    // calculate distance from the first cell in the grid divided by the divisor("resolution") and rounded down
    return Math.floor(lat  / this.divLat);
  }
  getLonPositionInGrid(lon: number): number {
    // calculate distance from the first cell in the grid divided by the divisor("resolution") and rounded down
    return Math.floor(lon / this.divLon);
  }
}
