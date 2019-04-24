import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ConfigService} from '../../config/config.service';
import {ItemStoreService} from '../data/item-store.service';
import {MapService} from '../map/map.service';

@Injectable({
  providedIn: 'root'
})
export class OscarItemsService {
  oscarItemList: Observable<OscarItem> = new Observable<OscarItem>();
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private itemStore: ItemStoreService,
              private mapService: MapService) { }

  getItems(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/items/all?q=${queryString}&rf=admin_level&i=true`;
    this.oscarItemList = this.http.get<OscarItem>(itemUrl);
    this.http.get<OscarItem[]>(itemUrl).subscribe(value => {
      value.map(item => {
        item.name = item.v[item.k.indexOf('name')];
      });
      this.itemStore.items = value.sort(((a, b) => b.score - a.score));
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
    this.oscarItemList = this.http.get<OscarItem>(itemUrl);
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
