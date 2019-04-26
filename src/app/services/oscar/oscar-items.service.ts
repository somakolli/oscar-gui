import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ConfigService} from '../../config/config.service';
import {ItemStoreService} from '../data/item-store.service';
import {MapService} from '../map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';

@Injectable({
  providedIn: 'root'
})
export class OscarItemsService {
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private itemStore: ItemStoreService,
              private mapService: MapService) { }

  getItems(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/items/all?q=${queryString}&rf=admin_level&i=true`;
    this.http.get<OscarItem[]>(itemUrl).subscribe(value => {
      value.map(item => {
        item.name = item.v[item.k.indexOf('name')];
      });
      this.itemStore.items = value.sort(((a, b) => b.score - a.score));
    });
  }
  getItemsBinary(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/itemswithlocation?q=${queryString}`;
    let itemList;
    this.http.get(itemUrl, {responseType: 'arraybuffer'}).subscribe(itemArray => {
      const returnArray = new Uint32Array(itemArray);
      itemList = new Array<OscarMinItem>();
      let j = 0;
      for (let i = 0; i < returnArray.length; i += 3) {
        itemList.push({id: returnArray[i], lon: returnArray[i + 1] / Math.pow(10, 7), lat: returnArray[i + 2] / Math.pow(10, 7)});
        j++;
      }
      this.itemStore.binaryItems = itemList;
    });
  }
  getLocalItems(queryString: string) {
    const northEast = this.mapService.bounds.getNorthEast();
    const southWest = this.mapService.bounds.getSouthWest();
    const minLat = Math.max(southWest.lat, -90);
    const maxLat = Math.min(northEast.lat, 90);
    const minLng = Math.max(southWest.lng, -180);
    const maxLng = Math.min(northEast.lng, 180);
    const localQueryString = "(" + queryString + ") $geo:" + minLng + "," + minLat + "," + maxLng + "," + maxLat;
    const itemUrl = this.configService.getOscarUrl() + `/oscar/items/all?q=${localQueryString}&rf=admin_level&i=true`;
    this.http.get<OscarItem[]>(itemUrl).subscribe(value => {
      value.map(item => {
        item.name = item.v[item.k.indexOf('name')];
      });
      // this.itemStore.currentItems = value;
      console.log('localitems', value);
    });
  }
  getApxItemCount(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/apxStats?q=${queryString}&rf=admin_level`;
    return this.http.get<any>(itemUrl);
  }
}
