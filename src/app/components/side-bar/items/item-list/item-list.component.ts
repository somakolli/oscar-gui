import {Component, NgZone, OnInit} from '@angular/core';
import {OscarItem} from '../../../../models/oscar/oscar-item';
import {Observable} from 'rxjs';
import {OscarItemsService} from '../../../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../../../services/data/item-store.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  localSearch = true;
  items: OscarItem[];
  totalCount = 0;
  localCount = 0;
  constructor(private itemStore: ItemStoreService, private zone: NgZone) {
  }

  ngOnInit() {
    this.itemStore.currentItems$.subscribe(items => {
      this.zone.run(() => this.localCount = items.length);
      if (this.localSearch) {
        this.zone.run( () => {
          this.items = items;
        });
      }
    });
    this.itemStore.items$.subscribe(items => {
      this.zone.run(() => this.totalCount = items.length);
      this.totalCount = items.length;
      if (!this.localSearch) {
        this.zone.run( () => {
          this.items = items;
        });
      }
    });
  }
  toggleLocal() {
    this.items = this.itemStore.currentItems;
    this.localSearch = true;
  }
  toggleTotal() {
    this.items = this.itemStore.items;
    this.localSearch = false;
  }
}
