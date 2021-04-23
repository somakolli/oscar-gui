import {Injectable, NgZone} from '@angular/core';
import {ItemStoreService} from '../data/item-store.service';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {GeoPoint} from '../../models/geo-point';
import {BehaviorSubject} from 'rxjs';
import '../../../../node_modules/leaflet-webgl-heatmap/src/webgl-heatmap/webgl-heatmap';

import {OscarItemsService} from '../oscar/oscar-items.service';
import {RoutingMarker} from '../../models/routing-marker';
import {LatLng, LatLngBounds, LayerGroup, Map as LeafletMap} from 'leaflet';
import {Region} from '../../models/oscar/region';
import {OscarItem} from '../../models/oscar/oscar-item';
declare var L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  routingMarkers = new Map<string, L.Marker>();
  maxZoom = 17;

  heatmap = new L.webGLHeatmap({size: 10, units: 'px'});

  searchMarkerLayer = new L.LayerGroup();
  routingMarkerLayer = new L.LayerGroup();
  regionLayer = new L.LayerGroup();
  rectLayer = new LayerGroup();
  zoom: number;
  private readonly _zoom = new BehaviorSubject<any>(null);
  readonly onZoom$ = this._zoom.asObservable();
  private readonly _move = new BehaviorSubject<any>(null);
  readonly onMove$ = this._move.asObservable();
  private readonly _click = new BehaviorSubject<any>(null);
  readonly onClick$ = this._click.asObservable();
  private readonly _contextMenu = new BehaviorSubject<any>(null);
  readonly onContextMenu$ = this._contextMenu.asObservable();
  readonly _mapReady = new BehaviorSubject<boolean>(false);
  readonly onMapReady$ = this._mapReady.asObservable();
  _map: LeafletMap;
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
  setMarker(geoPoint: GeoPoint, name: string): L.Marker {
    if (this.routingMarkers.has(name)) {
      this.routingMarkers.get(name).setLatLng([geoPoint.lat, geoPoint.lon]);
    } else {
      // @ts-ignore
      const marker = L.marker([geoPoint.lat, geoPoint.lon]);
      marker.addTo(this.routingMarkerLayer).bindPopup(name).openPopup();
      this.routingMarkers.set(name, marker);
      return marker;
    }
  }
  setMapReady(condition: boolean) {
    // @ts-ignore
    this.route.addTo(this.map);
    // this.heatmapLayer.addTo(this.map);
    this._mapReady.next(condition);
    this.searchMarkerLayer.addTo(this.map);
    this.map.addLayer(this.heatmap);
    this.map.addLayer(this.routingMarkerLayer);
    this.map.addLayer(this.rectLayer);
    this.map.addLayer(this.regionLayer);
    this.map.on('zoom', (event) => {
      this.zoom = event.target._zoom;
      this._zoom.next(event);
    });
    this.map.on('moveend', (event) => {
      this._move.next(event);
    });
    this.map.on('click', (event => this._click.next(event)));
    this.map.on('contextmenu', (event =>
        {
          this._contextMenu.next(event);
        }));
  }
  drawRoute(route: GeoPoint[]) {
    this.route.setLatLngs([]);
    const latLngs = [];
    for (const point of route) {
      latLngs.push(L.latLng([point.lat, point.lon]));
    }
    this.route.setLatLngs(latLngs);
  }
  drawItemsHeatmap(items: OscarMinItem[], intensity: number) {
    const dataPoints = [];
    for (const item of items) {
      dataPoints.push([item.lat, item.lon, intensity]);
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

        if (item.geometry.type === 'LineString') {
          this.drawGeoJSON(
            {
              type: item.type,
              properties: item.properties,
              geometry:
                {
                  type: 'Point',
                  coordinates: item.geometry.coordinates[0]
                }
                },
            popupText);
        }
        this.drawGeoJSON(item, popupText);

      });
    });
  }

  private drawGeoJSON(item, popupText: string) {
    L.geoJSON(item, {
      title: `${item.properties.id}`,
      pointToLayer: (geoJsonPoint, latlng) => {
        const smallIcon = new L.Icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
          popupAnchor: [1, -24],
        });
        return L.marker(latlng, {icon: smallIcon});
      },
      onEachFeature: ((feature, layer) => {
        layer.bindPopup(popupText);
      }),
      style: {color: 'blue', stroke: true, fill: false, opacity: 0.7}
    }).addTo(this.searchMarkerLayer);
  }
  drawRegion(region: OscarItem) {
    this.clearRegions();
    const feature = L.geoJSON(region.geometry).addTo(this.regionLayer);
    this.fitBounds(feature.getBounds());
  }

  drawRoutingMarker(routingMarkers: RoutingMarker[]) {
    // Creates a red marker with the coffee icon


  }
  clearRegions() {
    this.regionLayer.clearLayers();
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
  fitBounds(bounds: L.LatLngBounds) {
    console.log(bounds);
    if (bounds.getNorthEast().lat === 100000) {
      bounds  = new LatLngBounds(new LatLng(55.203953, 4.21875), new LatLng(47.219568, 14.897462));
    }
    this.map.fitBounds(bounds);
  }
  drawRect(id: string, bounds: L.LatLngBounds, color: string, weight: number, hover: string) {
    const rect = L.rectangle(bounds, {color, weight}).bindTooltip(hover).addTo(this.rectLayer);
  }
  clearRects() {
    this.rectLayer.clearLayers();
  }
  deleteMarker(id: string) {
    if (this.routingMarkers.has(id)) {
      this.routingMarkers.get(id).removeFrom(this.map);
      this.routingMarkers.delete(id);
    }
  }
  get ready() {
    return this._mapReady.value;
  }
}
