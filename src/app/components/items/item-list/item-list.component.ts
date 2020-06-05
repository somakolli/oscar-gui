import {Component, Input, NgZone, OnInit} from '@angular/core';
import {OscarItem} from '../../../models/oscar/oscar-item';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../../services/data/item-store.service';
import {MapService} from '../../../services/map/map.service';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  position;
  geoLocationItem: OscarItem;
  @Input()
  items: OscarItem[] = new Array<OscarItem>();
  @Input()
  localItems: OscarItem[] = new Array<OscarItem>();
  totalCount = 0;
  localCount = 0;
  fetchCount = 20;
  showTable = true;
  constructor(private itemStore: ItemStoreService, private zone: NgZone, private mapService: MapService, private oscarService: OscarItemsService,
              private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getPosition().then(location => {
      this.position = location;
    }, (err) => {});
  }
  onScrollDown() {
    this.queryNewItems(this.fetchCount);
  }
  onLocalScrollDown() {
    this.queryNewLocalItems(this.fetchCount);
    console.log('scroll-down');
  }
  queryNewLocalItems(count: number) {
    const currentLength = this.localItems.length;
    this.oscarService.getItemsInfo(this.itemStore.currentItemIds.slice(currentLength, currentLength + this.fetchCount)).subscribe(
      items => {
        this.zone.run(() => this.localItems.push(...items));
      }
    );
  }
  queryNewItems(count: number) {
    const currentLength = this.items.length;
    this.oscarService.getItemsInfo(this.itemStore.binaryItems.
    slice(currentLength, currentLength + this.fetchCount)).subscribe(items => this.zone.run(() => this.items.push(...items)));
  }
}
