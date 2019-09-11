import {Component, NgZone, OnInit} from '@angular/core';
import {OscarItem} from '../../../../models/oscar/oscar-item';
import {Observable} from 'rxjs';
import {OscarItemsService} from '../../../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../../../services/data/item-store.service';
import {MapService} from '../../../../services/map/map.service';
import {OscarMinItem} from '../../../../models/oscar/oscar-min-item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  localSearch = true;
  items: OscarItem[] = new Array<OscarItem>();
  localItems: OscarItem[] = new Array<OscarItem>();
  totalCount = 0;
  localCount = 0;
  fetchCount = 20;
  showTable = true;
  constructor(private itemStore: ItemStoreService, private zone: NgZone, private mapService: MapService, private oscarService: OscarItemsService) {
  }

  ngOnInit() {
    this.itemStore.binaryItemsFinished$.subscribe(() => {
      this.totalCount = this.itemStore.binaryItems.length;
      this.items = [];
      if (!(this.itemStore.binaryItems.length === 0)) {
        this.queryNewItems(this.fetchCount);
      }
    });
    this.itemStore.currentItemIdsFinished$.subscribe(() => {
      console.log('current item ids finished');
      this.localItems = [];
      this.zone.run( () => this.localCount = this.itemStore.currentItemIds.length);
      if (this.localCount === 0) {
        return;
      }
      this.queryNewLocalItems(this.fetchCount);
    });
  }
  onScrollDown() {
    this.queryNewItems(this.fetchCount);
  }
  onLocalScrollDown() {
    this.queryNewLocalItems(this.fetchCount);
  }
  queryNewLocalItems(count: number) {
    console.log('query new local items');
    const currentLength = this.localItems.length;
    this.oscarService.getItemsInfo(this.itemStore.currentItemIds.slice(currentLength, currentLength + this.fetchCount)).subscribe(
      items => {
          this.zone.run(() => this.localItems.push(...items));
      }
    );
  }
  queryNewItems(count: number) {
    console.log('query new global items');
    const currentLength = this.items.length;
    this.oscarService.getItemsInfo(this.itemStore.binaryItems.
      slice(currentLength, currentLength + this.fetchCount)).subscribe(
        items => this.zone.run(() => this.items.push(...items))
    );
  }
}
