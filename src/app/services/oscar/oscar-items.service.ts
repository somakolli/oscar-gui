import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ConfigService} from '../../config/config.service';
import {ItemStoreService} from '../data/item-store.service';

@Injectable({
  providedIn: 'root'
})
export class OscarItemsService {
  oscarItemList: Observable<OscarItem> = new Observable<OscarItem>();
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private itemStore: ItemStoreService) { }

  getItems(queryString: string) {
    const itemUrl = this.configService.getOscarUrl() + `/oscar/items/all?q=${queryString}&rf=admin_level&i=true`;
    this.oscarItemList = this.http.get<OscarItem>(itemUrl);
    this.http.get<OscarItem[]>(itemUrl).subscribe(value => {
      value.map(item => {
        item.name = item.v[item.k.indexOf('name')];
      });
      this.itemStore.items = value;
    });
  }
}
