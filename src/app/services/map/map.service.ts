import {Injectable, NgZone} from '@angular/core';
import {ItemStoreService} from '../data/item-store.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GeoPoint} from '../../models/geo-point';
import {BehaviorSubject} from 'rxjs';
declare var L;
import '../../../../node_modules/leaflet-webgl-heatmap/dist/leaflet-webgl-heatmap.min';
import '../../../../node_modules/leaflet-webgl-heatmap/src/webgl-heatmap/webgl-heatmap';
import {OscarItemsService} from '../oscar/oscar-items.service';



@Injectable({
  providedIn: 'root'
})
export class MapService {
  _map = L.Map;
  routingMarkers = new Map<string, L.Marker>();

  heatmap = L.webGLHeatmap({size: 10, units: 'px'});
  searchMarkerLayer = new L.LayerGroup();
  routingMarkerLayer = new L.LayerGroup();
  private readonly _zoom = new BehaviorSubject<any>(null);
  readonly onZoom$ = this._zoom.asObservable();
  private readonly _move = new BehaviorSubject<any>(null);
  readonly onMove$ = this._move.asObservable();
  private readonly _mapReady = new BehaviorSubject<boolean>(false);
  readonly onMapReady$ = this._mapReady.asObservable();
  route: L.Polyline = L.polyline([], {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  });
  constructor(private itemStore: ItemStoreService,
              private zone: NgZone,
              private oscarItemsService: OscarItemsService) {

  }

  setView(lat: number, lng: number, zoom: number) {
    // @ts-ignore
    this._map.setView([lat, lng], zoom);
  }
  get bounds() {
    // @ts-ignore
    return this._map.getBounds();
  }
  get map() {
    return this._map;
  }
  setMarker(geoPoint: GeoPoint, name: string) {
    if (this.routingMarkers.has(name)) {
      this.routingMarkers.get(name).setLatLng([geoPoint.lat, geoPoint.lon]);
    } else {
      // @ts-ignore
      const marker = L.marker([geoPoint.lat, geoPoint.lon]).addTo(this.routingMarkerLayer).bindPopup(name).openPopup();
      this.routingMarkers.set(name, marker);
    }
  }
  setMapReady(condition: boolean) {
    // @ts-ignore
    this.route.addTo(this.map);
    // this.heatmapLayer.addTo(this.map);
    this._mapReady.next(condition);
    this.searchMarkerLayer.addTo(this.map);
    this._map.addLayer(this.heatmap);
    this._map.addLayer(this.routingMarkerLayer);
    this._map.on('zoom', (event) => {
      this._zoom.next(event);
    });
    this._map.on('moveend', (event) => {
      this._move.next(event);
    });
  }
  drawRoute(route: GeoPoint[]) {
    this.route.setLatLngs([]);
    for (const point of route) {
      this.route.addLatLng([point.lat, point.lon]);
    }
  }
  drawItemsHeatmap(items: OscarMinItem[]) {
    const dataPoints = [];
    for (const item of items) {
      dataPoints.push([item.lat, item.lon, 1]);
    }
    this.clearHeatMap();
    this.heatmap.setData( dataPoints );
  }
  drawItemsMarker(items: OscarMinItem[]) {
    this.searchMarkerLayer.clearLayers();
    this.oscarItemsService.getMultipleItems(items).subscribe(data => {
      const itemFeatures = data.features;
      // draw markers
      itemFeatures.forEach((item) => {
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
        }).addTo(this.searchMarkerLayer);
      });
    });
  }
  clearHeatMap() {
    this.heatmap.setData([]);
  }
  clearSearchMarkers() {
    this.searchMarkerLayer.clearLayers();
  }
  clearRoutingMarkers() {
    this.routingMarkerLayer.clearLayers();
  }
  clearAllLayers() {
    this.clearHeatMap();
    this.clearRoutingMarkers();
    this.clearSearchMarkers();
  }
}
