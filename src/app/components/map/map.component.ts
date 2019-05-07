import { Component, OnInit } from '@angular/core';
import {latLng, LatLng, tileLayer, circle, polygon, marker, icon} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GridService} from '../../services/data/grid.service';

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
              private mapService: MapService,
              private gridService: GridService) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.setItemsToDraw(map.getBounds());
    this.mapService.map = map;
    this.itemStore.binaryItems$.subscribe(items => {
      map.setView([48.43379, 9.00203], 5);
      this.setItemsToDraw(map.getBounds());
    });
    map.on('moveend', (event) => {
      this.setItemsToDraw(map.getBounds());
    });
    map.on('zoom', (event) => {
      console.log('zoomlevel', map.getZoom());
      console.log('bounds', map.getBounds());
      this.setItemsToDraw(map.getBounds());
      // this.reDrawItems(this.itemStore.items, map.getZoom());
    });
    this.itemStore.currentBinaryItemsMap$.subscribe(items => {
      this.reDrawItems(map.getZoom());
    });
  }
  setItemsToDraw(bounds: L.LatLngBounds) {
    // this.itemStore.currentBinaryItems = this.itemStore.binaryItems.filter(item => this.itemIsInBounds(item, bounds));
    this.itemStore.currentBinaryItemsMap = this.gridService.getItems(bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast());
  }

  reDrawItems(zoomLevel: number) {
    this.data = {
      data: []
    };
    this.layerGroup.clearLayers();
    let length = 0;
    const itemsMap = this.itemStore.currentBinaryItemsMap;
    itemsMap.forEach((value, key) => {
      length += value.length;
    });
    // this.itemStore.currentItemIds = [];
    const currentIds = Array<number>();

    if (length <= this.markerThreshold) {
      itemsMap.forEach((value, key) => {
        value.forEach(itemPosition => {
          const item = this.itemStore.binaryItems[itemPosition];
          currentIds.push(item.id);
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
      });
    } else {
      let subsamplingSave = 0;
      const subSamplingValue = 100;
      itemsMap.forEach((value, key) => {
        const subSampling = value.length >= 30;
        for (let i = 0; i < value.length; i++) {
          const item = this.itemStore.binaryItems[value[i]];
          if (item) currentIds.push(item.id);
          if (i % subSamplingValue !== 0 && zoomLevel < 10) {
            subsamplingSave++;
            continue;
          }
          if (item) {
            this.data.data.push({
              lat: item.lat,
              lng: item.lon,
              count: 1,
              radius: 10
            });
          }
        }
      });
      console.log('Subsampling saved:', subsamplingSave);
    }
    this.itemStore.currentItemIds = [...currentIds];
    this.heatmapLayer.setData(this.data);
  }
}
