import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {OscarItem} from '../../models/oscar/oscar-item';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {LocationService} from '../../services/location.service';
import {GeoPoint} from '../../models/geo-point';
import {addRoutingPointEvent} from '../routes/routes.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.sass']
})

export class ItemDetailComponent implements OnInit {
  @Input() oscarItem: OscarItem;
  @Input() parent: string;
  @Output()
  public itemClick = new EventEmitter<OscarItem>();
  keyValues: object[] = [];
  distance = null;

  constructor(private itemStore: ItemStoreService,
              private mapService: MapService,
              private locationService: LocationService) {
  }

  ngOnInit() {
    OscarItem.setName(this.oscarItem);
    /*
    this.locationService.getPosition().then(pos => {
      this.distance =
        this.locationService.getDistanceFromLatLonInKm(pos.lat,
        pos.lng, this.oscarItem.firstPoint.lat, this.oscarItem.firstPoint.lon).toFixed(3);
    }, () => {
    });
     */
  }

  panTo() {
    this.mapService.setView(this.oscarItem.firstPoint.lat, this.oscarItem.firstPoint.lon, 18);
  }

  addToRouting() {
    addRoutingPointEvent.next({
      point: new GeoPoint(this.oscarItem.firstPoint.lat, this.oscarItem.firstPoint.lon),
      name: this.oscarItem.properties.name
    });
  }

  handleClick(event: MouseEvent) {
    this.itemClick.emit(this.oscarItem);
  }

}
