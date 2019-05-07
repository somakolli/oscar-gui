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
  hidden = false;
  constructor(private itemStore: ItemStoreService, private zone: NgZone, private mapService: MapService, private oscarService: OscarItemsService) {
  }

  ngOnInit() {
    this.itemStore.binaryItems$.subscribe((v) => {
      this.totalCount = v.length;
      this.items = [];
      if (!(v.length === 0)) {
        this.queryNewItems(this.fetchCount, this.itemStore.binaryItems);
      }
    });
    this.itemStore.currentItemIds$.subscribe((itemIds) => {
      this.localCount = itemIds.length;
      this.localItems = [];
      this.oscarService.getItemsInfo(itemIds.slice(0, this.fetchCount)).subscribe(
        items => {
          this.zone.run( () => this.localItems.push(...items));
        }
      );
    });
  }
  onScrollDown() {
    this.queryNewItems(this.fetchCount, this.itemStore.binaryItems);
  }
  onLocalScrollDown() {
    this.queryNewLocalItems(this.fetchCount);
    console.log('scroll-down');
  }
  queryNewLocalItems(count: number) {
    const currentLength = this.localItems.length;
    this.oscarService.getItemsInfo(this.itemStore.currentItemIds.slice(currentLength, currentLength + this.fetchCount)).subscribe(
      items => {
          this.localItems.push(...items);
      }
    );
  }
  queryNewItems(count: number, binaryItems: OscarMinItem[]) {
    const currentLength = this.items.length;
    const ids = Array<number>();
    for (let i = currentLength; i <= currentLength + count; i++) {
      ids.push(binaryItems[i].id);
    }
    this.oscarService.getItemsInfo(ids).subscribe(items => this.items.push(...items));
  }
}
