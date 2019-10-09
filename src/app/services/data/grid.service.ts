import { Injectable } from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {ItemStoreService} from './item-store.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {LatLngBounds} from 'leaflet';


declare var L;

@Injectable({
  providedIn: 'root'
})
export class GridService {
  gridMap = new Map<string, OscarMinItem[]>();
  gridSizeY = 3600;
  gridSizeX = 1800;
  private buildStatus = false;
  // divide lat and long fields by gridSize lat = [-90, +90] long = [-180,180]
  divLat = 180 / this.gridSizeX;
  divLon = 360 / this.gridSizeY;
  constructor(private itemStore: ItemStoreService) {

  }
  buildGrid() {
    this.gridMap = new Map<string, OscarMinItem[]>();
    for (const item of this.itemStore.binaryItems) {
      const latGridPos = this.getLatPositionInGrid(item.lat);
      const lonGridPos = this.getLonPositionInGrid(item.lon);
      if (!this.gridMap.has(JSON.stringify({lat: latGridPos, lon: lonGridPos}))) {
        this.gridMap.set(JSON.stringify({lat: latGridPos, lon: lonGridPos}), new Array<OscarMinItem>());
      }
      this.gridMap.get(JSON.stringify({lat: latGridPos, lon: lonGridPos})).push(item);
    }
    this.buildStatus = true;
  }
  setCurrentItems(minLat: number, minLon: number, maxLat: number, maxLon: number) {
    this.itemStore.currentItemIds = [];
    const bbox = {
      minLonPos : ( (minLon) / this.divLon),
      minLatPos : ( (minLat) / this.divLat),
      maxLonPos : ( (maxLon) / this.divLon),
      maxLatPos : ( (maxLat) / this.divLat)
    };
    this.gridMap.forEach((value, key) => {
      const keyObj = JSON.parse(key) as {lat: number, lon: number};
      if (keyObj.lat >= bbox.minLatPos - 1 && keyObj.lon >= bbox.minLonPos - 1 &&
        keyObj.lat <= bbox.maxLatPos && keyObj.lon <= bbox.maxLonPos) {
        if (keyObj.lat < bbox.minLatPos || keyObj.lon < bbox.minLonPos || keyObj.lat > bbox.maxLatPos - 1) {
          value.forEach( item => {
            if (item) {
              if (item.lat >= minLat && item.lon >= minLon && item.lat <= maxLat && item.lon <= maxLon) {
                this.itemStore.currentItemIds.push(item);
              }
            }
          });
        } else {
          this.itemStore.currentItemIds.push(...value);
        }
      }
    });
    this.itemStore.currentItemIdsFinished();
  }
  getLatPositionInGrid(lat: number): number {
    // calculate distance from the first cell in the grid divided by the divisor("resolution") and rounded down
    return Math.floor(lat  / this.divLat);
  }
  getLonPositionInGrid(lon: number): number {
    // calculate distance from the first cell in the grid divided by the divisor("resolution") and rounded down
    return Math.floor(lon / this.divLon);
  }
  getBBox(): Promise<L.LatLngBounds> {
    return new Promise((resolve, reject) => {
      if (!this.buildStatus) {
        reject('grid not finished');
      }
      let minLat = 100000;
      let minLon = 100000;
      let maxLat = -100000;
      let maxLon = -100000;
      this.gridMap.forEach((value, key) => {
        value.forEach( e => {
          if (e.lat < minLat) {
            minLat = e.lat;
          }
          if (e.lon < minLon) {
            minLon = e.lon;
          }
          if (e.lat > maxLat) {
            maxLat = e.lat;
          }
          if (e.lon > maxLon) {
            maxLon = e.lon;
          }
        });

      });
      const southWest = L.latLng(minLat , minLon);
      const northEast = L.latLng(maxLat , maxLon);
      resolve(new L.latLngBounds(southWest, northEast));
    });
  }
}
