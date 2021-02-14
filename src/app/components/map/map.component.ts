import {Component, NgZone, OnInit} from '@angular/core';
import {latLng, tileLayer, Map} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';

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
      tileLayer('https://tiles.fmi.uni-stuttgart.de/{z}/{x}/{y}.png', { maxZoom: this.mapService.maxZoom, attribution: '...' }),
    ],
    zoom: 7,
    center: latLng([ 48.43379, 9.00203 ]),
  };

  constructor(private itemStore: ItemStoreService,
              private mapService: MapService) { }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.mapService._map = map;
    this.mapService.setMapReady(true);
  }
}
