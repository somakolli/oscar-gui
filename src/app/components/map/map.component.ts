import { Component, OnInit } from '@angular/core';
import {latLng, LatLng, tileLayer, circle, polygon, marker, icon} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GridService} from '../../services/data/grid.service';
import { _ } from 'underscore';
import {TimerService} from '../../services/timer.service';
import {sample} from 'rxjs/operators';

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
              private gridService: GridService,
              private timer: TimerService) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.mapService.map = map;
    this.itemStore.binaryItemsFinished$.subscribe((status) => {
      map.setView([48.43379, 9.00203], 5);
      const bounds = map.getBounds();
      if (!this.gridService.getStatus()) {
        this.gridService.buildStatus$.subscribe((buildStatus) => {
          if (buildStatus) {
            this.gridService.setCurrentItems(bounds.getSouth(),
              bounds.getWest(), bounds.getNorth(), bounds.getEast());
          }
        });
      }
    });
    map.on('moveend', (event) => {
      console.log(event);
      const bounds = map.getBounds();
      this.gridService.setCurrentItems(bounds.getSouth(),
        bounds.getWest(), bounds.getNorth(), bounds.getEast());
    });
    map.on('zoom', (event) => {
      console.log(event);
      const bounds = map.getBounds();
      this.gridService.setCurrentItems(bounds.getSouth(),
        bounds.getWest(), bounds.getNorth(), bounds.getEast());
      // this.reDrawItems(this.itemStore.items, map.getZoom());
    });
    this.itemStore.currentItemIdsFinished$.subscribe(() => {
      this.reDrawItems(map.getZoom());
    });
  }

  reDrawItems(zoomLevel: number) {
    this.data = {
      data: []
    };
    this.layerGroup.clearLayers();
    let length = 0;
    length = this.itemStore.currentItemIds.length;
    if (length <= this.markerThreshold) {
      this.itemStore.currentItemIds.forEach((item) => {
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
      const sampleIds = _.sample(this.itemStore.currentItemIds, 5000);
      for (let i = 0; i < sampleIds.length; i++) {
         const item = sampleIds[i];
         if (item) {
           this.data.data.push({
             lat: item.lat,
             lng: item.lon,
             count: 1,
             radius: 10
           });
         }
      }
    }
    this.heatmapLayer.setData(this.data);
  }
}
