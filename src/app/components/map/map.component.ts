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
              private searchService: SearchService) { }

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
      this.oscarItemsService.getMultipleItems(this.itemStore.currentItemIds).subscribe(data => {
        const items = data.features;
        items.forEach((item) => {
           L.geoJSON(item, {
             title: `${item.properties.id}`,
             style: {color: 'blue', stroke: true, fill: false, opacity: 0.7}
           }).addTo(this.layerGroup).on('click', (event1 => {
             this.oscarItemsService.getItemsInfoById(parseInt(event1.target.options.title))
               .subscribe(returnItem => this.itemStore.setHighlightedItem(returnItem[0]));
           }));
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
      this.searchService.setState(SearchState.DrawingComplete);
      this.gridService.getBBox().subscribe(bbox  => {
        if (bbox) {
          map.fitBounds(bbox);
        }
      });
    }
  }
}
