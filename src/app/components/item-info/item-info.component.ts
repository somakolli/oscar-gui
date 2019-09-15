import {Component, NgZone, OnInit} from '@angular/core';
import {ItemStoreService} from '../../services/data/item-store.service';
import {OscarItem} from '../../models/oscar/oscar-item';
import {MapService} from '../../services/map/map.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.sass']
})
export class ItemInfoComponent implements OnInit {

  oscarItem: OscarItem;
  showTable = false;
  constructor(private itemStore: ItemStoreService,
              private zone: NgZone) { }

  ngOnInit() {
    this.itemStore.highlightedItem$.subscribe(item => {
      if (item) {
        OscarItem.setName(item);
        this.oscarItem = item;
      } else {
        this.oscarItem = null;
      }
    });
  }

}
