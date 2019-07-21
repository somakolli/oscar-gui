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
              private timer: TimerService,
              private oscarItemsService: OscarItemsService,
              private searchService: SearchService) { }

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
      if (this.itemStore.streets) {
        this.oscarItemsService.getItemsInfo(this.itemStore.currentItemIds).subscribe(items => {
          items.forEach((item) => {
            const myCoordinates = [];
            const myLines = [];
            if (item.shape.t === 2) {
              item.shape.v.forEach(lonLat => {
                if (lonLat[1] && lonLat[0]) {
                  myCoordinates.push([lonLat[1], lonLat[0]]);
                }
              });
              myLines.push({type: 'LineString', coordinates: myCoordinates});
            }
            const myStyle = {
              color: '#ff7800',
              weight: 5,
              opacity: 0.65
            };
            console.log(myLines);
            L.geoJSON(myLines, {
              title: `${item.id}`,
              style: myStyle
            }).addTo(this.layerGroup).on('click', (event1 => {
              this.oscarItemsService.getItemsInfoById(parseInt(event1.target.options.title))
                .subscribe(returnItem => this.itemStore.setHighlightedItem(returnItem[0]));
            }));
          });
        });
      } else {
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
            }).addTo(this.layerGroup).on('click', (event1 => {
            this.oscarItemsService.getItemsInfoById(parseInt(event1.target.options.title))
              .subscribe(returnItem => this.itemStore.setHighlightedItem(returnItem[0]));
          }));
        });
      }
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
      this.searchService.setState(SearchState.DrawingComplete);
      this.gridService.getBBox().subscribe(bbox  => {
        if (bbox) {
          map.fitBounds(bbox);
        }
      });
    }
  }
}
