import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {GeoPoint} from '../../../models/geo-point';
import {MapService} from '../../../services/map/map.service';

@Component({
  selector: 'app-geo-point-view',
  templateUrl: './geo-point-view.component.html',
  styleUrls: ['./geo-point-view.component.sass']
})
export class GeoPointViewComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  geoPoint: GeoPoint;
  @Output()
  geoPointChange = new EventEmitter<GeoPoint>();
  selected = false;
  map: L.Map;
  mapInitialized = false;
  constructor(public mapService: MapService, public zone: NgZone) {
    mapService.onMapReady$.subscribe((ready) => {
      if (ready === true && this.mapInitialized === false) {
        this.mapInitialized = true;
        this.map = mapService._map;
        console.log(this.mapService._map);
        this.map.on('click', (event) => {
          if (this.selected) {
            zone.run(() => {
              this.geoPoint.lat = event.latlng.lat;
              this.geoPoint.lon = event.latlng.lng;
            });
            this.mapService.setMarker(this.geoPoint, this.name);
          }
        });
      }
    });
  }
  ngOnInit(): void {
  }
  geoPointChanged() {
    this.geoPointChange.emit(this.geoPoint);
  }
}
