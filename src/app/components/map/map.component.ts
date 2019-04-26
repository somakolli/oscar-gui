import { Component, OnInit } from '@angular/core';
import {latLng, LatLng, tileLayer, circle, polygon, marker, icon} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {MapService} from '../../services/map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';

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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 24, attribution: '...' }),
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
    this.itemStore.binaryItems$.subscribe(items => {
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
    this.itemStore.currentBinaryItems$.subscribe(items => {
      this.reDrawItems(items, map.getZoom());
    });
  }
  setItemsToDraw(bounds: L.LatLngBounds) {
    this.itemStore.currentBinaryItems = this.itemStore.binaryItems.filter(item => this.itemIsInBounds(item, bounds));
  }

  itemIsInBounds(item: OscarMinItem, bounds: L.LatLngBounds): boolean {
    return bounds.contains({lat: item.lat, lng: item.lon});
  }
  reDrawItems(items: OscarMinItem[], zoomLevel: number) {
    this.data = {
      data: []
    };
    console.log('redrawing items');
    this.layerGroup.clearLayers();

    if (this.itemStore.currentBinaryItems.length <= 120) {
      items.forEach(item => {
        const lat = item.lat;
        const lng = item.lon;
        const itemMarker = marker([ lat, lng ],
          {
            icon: icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: 'leaflet/marker-icon.png',
                shadowUrl: 'leaflet/marker-shadow.png'
              }),
            title: `${item.id}`
          }).addTo(this.layerGroup);
        const itemPopup = L.popup().setContent(`${item.id} <br> ${lat} ${lng}`);
        itemMarker.bindPopup(itemPopup);
      });
    } else {
      items.forEach( item => {
        this.data.data.push({
          lat: item.lat,
          lng: item.lon,
          count: 1,
          radius: 10
        });
      });
    }
    this.heatmapLayer.setData(this.data);
  }
}
