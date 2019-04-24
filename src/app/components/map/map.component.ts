import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer, circle, polygon, marker } from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {MapService} from '../../services/map/map.service';

declare var L;
declare var HeatmapOverlay;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  markerThreshold = 120;
  data = {
    data: []
  };
  heatmapLayer = new HeatmapOverlay({
    radius: 0.1,
    maxOpacity: 0.8,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  });

  layerGroup: L.LayerGroup = new L.LayerGroup();
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      this.heatmapLayer,
      this.layerGroup
    ],
    zoom: 7,
    center: latLng([ 48.43379, 9.00203 ]),
  };

  constructor(private itemStore: ItemStoreService,
              private mapService: MapService) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.mapService.map = map;
    this.itemStore.items$.subscribe(items => {
      map.setView([48.43379, 9.00203], 5);
      this.setItemsToDraw(map.getBounds());
    });
    map.on('move', (event) => {
      this.setItemsToDraw(map.getBounds());
    });
    map.on('zoom', (event) => {
      console.log('zoomlevel', map.getZoom());
      console.log('bounds', map.getBounds());
      this.setItemsToDraw(map.getBounds());
      // this.reDrawItems(this.itemStore.items, map.getZoom());
    });
    this.itemStore.currentItems$.subscribe(items => {
      this.reDrawItems(items, map.getZoom());
    });
  }
  setItemsToDraw(bounds: L.LatLngBounds) {
    this.itemStore.currentItems = this.itemStore.items.filter(item => this.itemIsInBounds(item, bounds));
    // console.log(this._visibleItems.getValue());
  }

  itemIsInBounds(item: OscarItem, bounds: L.LatLngBounds): boolean {
    return bounds.contains({lat: item.bbox[0], lng: item.bbox[2]});
  }
  reDrawItems(items: OscarItem[], zoomLevel: number) {
    this.data = {
      data: []
    };
    console.log('redrawing items');
    this.layerGroup.clearLayers();

    if (this.itemStore.currentItems.length <= 120) {
      items.forEach(item => {
        const lat = item.bbox[0];
        const lng = item.bbox[2];
        const itemMarker = marker([ lat, lng ],
          {title: `${item.name}`}).addTo(this.layerGroup);
        const itemPopup = L.popup().setContent(`${item.name} <br> ${lat} ${lng}`);
        itemMarker.bindPopup(itemPopup);
      });
    } else {
      items.forEach( item => {
        this.data.data.push({
          lat: item.bbox[0],
          lng: item.bbox[2],
          count: 1,
          radius: 10
        });
      });
    }
    this.heatmapLayer.setData(this.data);
  }
}
