import {Component, Input, NgZone, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {OscarItem} from '../../models/oscar/oscar-item';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {MapService} from '../../services/map/map.service';

@Component({
  selector: 'app-new-item-list',
  templateUrl: './new-item-list.component.html',
  styleUrls: ['./new-item-list.component.sass']
})
export class NewItemListComponent implements OnInit, OnChanges {
  constructor(private oscarService: OscarItemsService, private zone: NgZone, private mapService: MapService) { }
  @Input()
  minItems: OscarMinItem[];
  items: OscarItem[] = [];
  fetchCount = 20;
  detail = false;
  detailItem: OscarItem;
  markerId = 'Selected Item';
  ngOnInit(): void {
    this.queryNewItems(this.fetchCount);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.items = [];
    this.queryNewItems(this.fetchCount);
    document.getElementById('list-div').scrollIntoView({behavior: 'smooth'});
    this.mapService.deleteMarker(this.markerId);
  }
  onScrollDown() {
    this.queryNewItems(this.fetchCount);
  }
  queryNewItems(count: number) {
    if (this.items.length > 0 && this.items.length < this.fetchCount) {
      return;
    }
    const currentLength = this.items.length;
    this.oscarService.getItemsInfo(this.minItems.
    slice(currentLength, currentLength + this.fetchCount)).subscribe(items => this.zone.run(() => this.items.push(...items)));
  }

  clickOnItem(item: OscarItem) {
    this.detail = true;
    this.zone.run(() => this.detailItem = item);
    this.mapService.setMarker(item.firstPoint, this.markerId);
  }
  backButtonClick($event: MouseEvent) {
    this.detail = false;
    this.detailItem = null;
    this.mapService.deleteMarker(this.markerId);
  }
  scroll(detailDiv: HTMLDivElement) {
    detailDiv.scrollIntoView({behavior: 'smooth'});
  }
}
