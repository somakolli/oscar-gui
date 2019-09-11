import {Component, OnInit} from '@angular/core';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {GridService} from '../../services/data/grid.service';
import {_} from 'underscore';
import {TimerService} from '../../services/timer.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {SearchService} from '../../services/state/search.service';
import {SearchState} from '../../models/state/search-state.enum';
import {LineString} from 'geojson';
import {MapStateService} from '../../services/state/map-state.service';

declare var L;
declare var HeatmapOverlay;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  markerThreshold = 120;
  i = 0;
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
      tileLayer('https://tiles.fmi.uni-stuttgart.de/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '...' }),
      this.heatmapLayer,
      this.layerGroup
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
              private mapState: MapStateService) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.mapService.map = map;
    this.itemStore.binaryItemsFinished$.subscribe((status) => {
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
      const bounds = map.getBounds();
      this.mapState.setBounds(bounds);
      this.gridService.setCurrentItems(bounds.getSouth(),
        bounds.getWest(), bounds.getNorth(), bounds.getEast());
    });
    map.on('zoom', (event) => {
      const bounds = map.getBounds();
      this.mapState.setBounds(bounds);
      this.gridService.setCurrentItems(bounds.getSouth(),
        bounds.getWest(), bounds.getNorth(), bounds.getEast());
    });
    this.itemStore.currentItemIdsFinished$.subscribe(() => {
      this.reDrawItems(map.getZoom(), map);
    });
  }

  reDrawItems(zoomLevel: number, map: L.Map) {
    this.data = {
      data: []
    };
    this.layerGroup.clearLayers();
    let length = 0;
    length = this.itemStore.currentItemIds.length;
    const streets = true;
    if (length <= this.markerThreshold) {
      /*for ( const item of this.itemStore.currentItemIds) {
        const myMarker = L.marker([item.lat, item.lon]).addTo(this.layerGroup);
        myMarker.bindPopup(test);
      }*/
      if (this.itemStore.currentItemIds.length === 0) {
        return;
      }
      this.oscarItemsService.getMultipleItems(this.itemStore.currentItemIds).subscribe(data => {
        const items = data.features;
        // draw markers

        items.forEach((item) => {
          let keyValues  = [];
          keyValues.push({k: 'osm-id', v: item.properties.osmid});
          keyValues.push({k: 'oscar-id', v: item.properties.id});
          for (let i = 0; i < item.properties.k.length; i++) {
            keyValues.push({k : item.properties.k[i], v : item.properties.v[i]});
            if (item.properties.k[i] === 'name') {
              const name = item.properties.v[i];
              if (name === '') {
                item.properties.name = 'Item without name';
              } else {
                item.properties.name = item.properties.v[i];
              }
            }
          }
          let popupText = `
            <div><h6>${item.properties.name}</h6><br>
            <a href="https://www.openstreetmap.org/${item.properties.type}/${item.properties.osmid}" target="_blank">OSM</a>
            <ul style="list-style-type:none;">
          `;
          keyValues.forEach(k => {
            popupText += `<li>${k.k}:${k.v}</li>`;
          });
          popupText += '</ul></div>';
          L.geoJSON(item, {
              title: `${item.properties.id}`,
            pointToLayer: (geoJsonPoint, latlng) => {
              var smallIcon = new L.Icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: 'leaflet/marker-icon.png',
                shadowUrl: 'leaflet/marker-shadow.png',
                popupAnchor:  [1, -24],
              });
              return L.marker(latlng, {icon: smallIcon});
            },
              onEachFeature: ((feature, layer) => {
                layer.bindPopup(popupText);
              }),
              style: {color: 'blue', stroke: true, fill: false, opacity: 0.7}
          }).addTo(this.layerGroup);
          });
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
    if (this.searchService.getState() !== SearchState.DrawingComplete) {
      if (this.i === 0 && !this.searchService.getBoundingBox()) {
        this.i = 2;
      }
      this.i++;
      this.searchService.setState(SearchState.DrawingComplete);
      console.log(this.i);
      console.log(this.searchService.getBoundingBox());
      if (this.searchService.getBoundingBox()) {
        map.fitBounds(this.searchService.getBoundingBox());
        this.searchService.setBoundingBox(null);
      } else {
        this.gridService.getBBox().subscribe(bbox  => {
          if (bbox && this.i > 2) {
            map.fitBounds(bbox);
          }
        });
      }
    }
  }
}
