import {Injectable} from '@angular/core';
import {HttpClient, HttpUrlEncodingCodec} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ConfigService} from '../../config/config.service';
import {ItemStoreService} from '../data/item-store.service';
import {MapService} from '../map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GridService} from '../data/grid.service';
import {OscarApxstats} from '../../models/oscar/oscar-apxstats';
import {FacetRefinements, ParentRefinements} from '../../models/oscar/refinements';
import {SearchState} from '../../models/state/search-state.enum';
import {SearchService} from '../state/search.service';
import {LocationService} from '../location.service';

@Injectable({
  providedIn: 'root'
})
export class OscarItemsService {
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private itemStore: ItemStoreService,
              private mapService: MapService,
              private gridService: GridService,
              private searchService: SearchService,
              private locationService: LocationService) { }
  getItemsBinary(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/itemswithlocation?q=${encodeURIComponent(queryString)}`;
    this.http.get(itemUrl, {responseType: 'arraybuffer'}).subscribe(itemArray => {
      const returnArray = new Uint32Array(itemArray);
      const itemList = new Array<OscarMinItem>();
      let j = 0;
      for (let i = 0; i < returnArray.length; i += 3) {
        itemList.push({id: returnArray[i], lat: this.toDoubleLat(returnArray[i + 1]), lon: this.toDoubleLon(returnArray[i + 2])});
        j++;
      }
      this.locationService.getPosition().then((location) => {
        this.itemStore.binaryItems = itemList.sort((a, b) => {
          return this.locationService.getDistanceFromLatLonInKm(a.lat, a.lon, location.lat, location.lng) -
            this.locationService.getDistanceFromLatLonInKm(b.lat, b.lon, location.lat, location.lng);
        });
      }, (err) => { this.itemStore.binaryItems = itemList; }).finally(() => {
        this.itemStore.binaryItemsFinished();
        this.gridService.buildGrid();
        const bounds = this.mapService.bounds;
        this.gridService.setCurrentItems(bounds.getSouth(),
          bounds.getWest(), bounds.getNorth(), bounds.getEast());
      });
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
        item.properties.name = item.properties.v[item.properties.k.indexOf('name')];
      });
      // this.itemStore.currentItems = value;
    });
  }
  getApxItemCount(queryString: string): Observable<OscarApxstats> {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/cqr/clustered/apxstats?q=${encodeURIComponent(queryString)}&rf=admin_level`;
    return this.http.get<OscarApxstats>(itemUrl);
  }
  getItemsInfo(items: OscarMinItem[]): Observable<OscarItem[]> {
    const ids = new Array<number>();
    items.forEach(item => ids.push(item.id));
    const queryString = this.configService.getOscarUrl() + `/oscar/items/info?i=${JSON.stringify(ids)}`;
    return this.http.get<OscarItem[]>(queryString);
  }
  getItemsInfoById(id: number): Observable<OscarItem[]> {
    const queryString = this.configService.getOscarUrl() + `/oscar/items/info?i=${JSON.stringify([id])}`;
    return this.http.get<OscarItem[]>(queryString);
  }
  getItemsInfoByIds(ids: number[]): Observable<OscarItem[]> {
    const queryString = this.configService.getOscarUrl() + `/oscar/items/info?i=${JSON.stringify(ids)}`;
    return this.http.get<OscarItem[]>(queryString);
  }
  getParents(query: string, queryId: number): Observable<ParentRefinements> {
    console.log(queryId);
    return this.http.get<ParentRefinements>(

      this.configService.getOscarUrl() + `/oscar/kvclustering/get?queryId=${queryId}&q=${encodeURIComponent(query)}+&rf=admin_level&type=p&maxRefinements=20`
    );
  }
  getFacets(query: string, queryId: number): Observable<FacetRefinements> {
    return this.http.get<FacetRefinements>(
      this.configService.getOscarUrl() + `/oscar/kvclustering/get?queryId=${queryId}&q=${encodeURIComponent(query)}+&rf=admin_level&type=f&maxRefinements=20&exceptions=%5B%5D&debug=true&keyExceptions=%5B%22wheelchair%22%2C+%22addr%22%2C+%22level%22%2C+%22toilets%3Awheelchair%22%2C+%22building%22%2C+%22source%22%2C+%22roof%22%5D&facetSizes=%5B%5D&defaultFacetSize=10`
    );
  }
  getMultipleItems(items: OscarMinItem[]): any {
    const ids = new Array<number>();
    items.forEach(item => ids.push(item.id));
    const formdata = new FormData();
    formdata.append('which', JSON.stringify(ids));
    formdata.append('format', 'geojson');
    formdata.append('shape', 'true');
    const queryString = this.configService.getOscarUrl() + `/oscar/itemdb/multiple`;
    return this.http.post(queryString, formdata);
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
