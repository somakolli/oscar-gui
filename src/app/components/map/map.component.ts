import {Component, NgZone, OnInit} from '@angular/core';
import {latLng, tileLayer} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {GridService} from '../../services/data/grid.service';
import {TimerService} from '../../services/timer.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {SearchService} from '../../services/state/search.service';
import {MapStateService} from '../../services/state/map-state.service';
import {LocationService} from '../../services/location.service';

declare var L;
declare var HeatmapOverlay;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  i = 0;
  data = {
    data: []
  };
  options = {
    layers: [
      tileLayer('https://tiles.fmi.uni-stuttgart.de/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '...' }),
    ],
    zoom: 7,
    center: latLng([ 48.43379, 9.00203 ]),
  };

  constructor(private itemStore: ItemStoreService,
              private mapService: MapService,
              private gridService: GridService,
              private timer: TimerService,
              private oscarItemsService: OscarItemsService,
              private searchService: SearchService,
              private mapState: MapStateService,
              private locationService: LocationService,
              private zone: NgZone) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.mapService._map = map;
    this.mapService.setMapReady(true);
  }
}
