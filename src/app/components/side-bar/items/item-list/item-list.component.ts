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
  items: OscarMinItem[];
  totalCount = 0;
  localCount = 0;
  hidden = false;
  constructor(private itemStore: ItemStoreService, private zone: NgZone, private mapService: MapService) {
  }

  ngOnInit() {
    this.itemStore.currentBinaryItems$.subscribe(items => {
      this.zone.run(() => this.localCount = items.length);
      if (this.localSearch) {
        this.zone.run( () => {
          this.items = items;
        });
      }
    });
    this.itemStore.binaryItems$.subscribe(items => {
      this.zone.run(() => {
        this.totalCount = items.length;
      });
      if (!this.localSearch) {
        this.zone.run( () => {
          this.items = items;
        });
      }
    });
  }
  toggleLocal() {
    this.items = this.itemStore.currentBinaryItems;
    this.localSearch = true;
  }
  toggleTotal() {
    this.items = this.itemStore.binaryItems;
    this.localSearch = false;
  }
}
