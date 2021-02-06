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
        this.map.on('click', (event: any) => {
          if (this.selected) {
            zone.run(() => {
              const {lng, lat} = event.latlng;
              this.geoPoint.lat = lat;
              this.geoPoint.lon = lng;
              this.geoPointChanged();
            });
            const marker = this.mapService.setMarker(this.geoPoint, this.name);
            marker.dragging.enable();
            marker.on('drag', (dragEvent: any) => {
              zone.run(() => {
                this.geoPoint.lat = dragEvent.latlng.lat;
                this.geoPoint.lon = dragEvent.latlng.lng;
                this.geoPointChanged();
              });
            });
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
