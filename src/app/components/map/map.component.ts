import {Component, NgZone, OnInit} from '@angular/core';
import {latLng, tileLayer} from 'leaflet';
import {ItemStoreService} from '../../services/data/item-store.service';
import {MapService} from '../../services/map/map.service';
import {GridService} from '../../services/data/grid.service';
import {TimerService} from '../../services/timer.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {SearchService} from '../../services/state/search.service';
import {InitState, SearchState} from '../../models/state/search-state.enum';
import {MapStateService} from '../../services/state/map-state.service';
import {LocationService} from '../../services/location.service';
import * as _ from 'lodash';

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
      tileLayer('https://tiles.fmi.uni-stuttgart.de/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '...' }),
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
              private mapState: MapStateService,
              private locationService: LocationService,
              private zone: NgZone) { }

  ngOnInit() {
  }

  onMapReady(map: L.Map) {
    this.mapService._map = map;
    this.mapService.setMapReady(true);
    /*
    map.on('moveend', (event) => {
      console.log('move');
      const bounds = map.getBounds();
      this.mapState.setBounds(bounds);
      this.gridService.setCurrentItems(bounds.getSouth(),
        bounds.getWest(), bounds.getNorth(), bounds.getEast());
    });

    map.on('zoom', (event) => {
      console.log('zoom');
      const bounds = map.getBounds();
      this.mapState.setBounds(bounds);
      this.gridService.setCurrentItems(bounds.getSouth(),
        //bounds.getWest(), bounds.getNorth(), bounds.getEast());
    });
    this.itemStore.currentItemIdsFinished$.subscribe((state) => {
      if (state !== 0) {
        this.zone.run(() => this.reDrawItems(map.getZoom(), map, this.itemStore.radius));
      }
    });
    this.itemStore.radiusChange$.subscribe(radius => {
      this.zone.run(() => this.reDrawItems(map.getZoom(), map, radius));
    });
     */
  }

  /*
  reDrawItems(zoomLevel: number, map: L.Map, radius: number) {
    this.data = {
      data: []
    };
    this.layerGroup.clearLayers();
    let length = 0;
    length = this.itemStore.currentItemIds.length;
    this.locationService.getPosition().then(location => {
      const greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      const marker = L.marker([location.lat, location.lng], {icon: greenIcon}).addTo(this.layerGroup);
      marker.bindPopup('This is your current location.');
    }, () => {});
    if (length <= this.markerThreshold) {
      this.oscarItemsService.getMultipleItems(this.itemStore.currentItemIds).subscribe(data => {
        const items = data.features;
        // draw markers

        items.forEach((item) => {
          const keyValues  = [];
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
              const smallIcon = new L.Icon({
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
      let sampleIds = _.sampleSize(this.itemStore.currentItemIds, 5000);
      this.locationService.getPosition().then((location) => {
        sampleIds = sampleIds.filter((item) => {
          return this.locationService.getDistanceFromLatLonInKm(item.lat, item.lon, location.lat, location.lng) < radius;
        });
      }, (err) => {}).finally(() => {
        for (const item of sampleIds) {
          if (item) {
            this.data.data.push({
              lat: item.lat,
              lng: item.lon,
              count: 1,
              radius: 10
            });
          }
        }
        this.zone.run(() => this.heatmapLayer.setData(this.data));
      });
    }
    this.heatmapLayer.setData(this.data);
    if (this.searchService.getInitState() !== InitState.InitFinished) {
      this.searchService.setInitState(InitState.InitFinished);
      console.log(this.i);
      map.fitBounds(this.searchService.getBoundingBox());
    }
    if (this.searchService.getState() !== SearchState.DrawingComplete && this.searchService.getInitState() === InitState.InitFinished) {
      this.searchService.setState(SearchState.DrawingComplete);
      this.gridService.getBBox().then(bbox  => {
        if (bbox) {
          if (this.searchService.getInitState() !== InitState.InitFinished) {
            this.searchService.setInitState(InitState.InitFinished);
            return;
          }
          map.fitBounds(bbox);
        }
      }).catch((reason => console.log(reason)));
    }
  }
  */
}
