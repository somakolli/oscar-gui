import {Injectable} from '@angular/core';
import {HttpClient, HttpUrlEncodingCodec} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ConfigService} from '../../config/config.service';
import {ItemStoreService} from '../data/item-store.service';
import {MapService} from '../map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GridService} from '../data/grid.service';

@Injectable({
  providedIn: 'root'
})
export class OscarItemsService {
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private itemStore: ItemStoreService,
              private mapService: MapService,
              private gridService: GridService) { }
  getItemsBinary(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/itemswithlocation?q=${queryString}`;
    this.http.get(encodeURI(itemUrl), {responseType: 'arraybuffer'}).subscribe(itemArray => {
      const returnArray = new Uint32Array(itemArray);
      const itemList = new Array<OscarMinItem>();
      let j = 0;
      for (let i = 0; i < returnArray.length; i += 3) {
        itemList.push({id: returnArray[i], lat: this.toDoubleLat(returnArray[i + 1]), lon: this.toDoubleLon(returnArray[i + 2])});
        j++;
      }
      this.itemStore.binaryItems = itemList;
      this.itemStore.binaryItemsFinished();
      this.gridService.buildGrid();
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
    });
  }
  getApxItemCount(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/apxStats?q=${queryString}&rf=admin_level`;
    return this.http.get<any>(itemUrl);
  }
  getItemsInfo(items: OscarMinItem[]): Observable<OscarItem[]> {
    const ids = new Array<number>();
    items.forEach(item => ids.push(item.id));
    const queryString = this.configService.getOscarUrl() + `/oscar/items/info?i=${JSON.stringify(ids)}`;
    return this.http.get<OscarItem[]>(queryString);
  }
  private toDoubleLat(lat: number) {
    // tslint:disable-next-line:no-bitwise
    return (lat / (1 << 24)) - 90;
  }
  private toDoubleLon(lon: number) {
    // tslint:disable-next-line:no-bitwise
    return (lon / (1 << 23)) - 180;
  }
}
