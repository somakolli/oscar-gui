import {Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {RoutingMarker} from '../../models/routing-marker';
import {CdkDragDrop} from '@angular/cdk/drag-drop/drag-events';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {RoutingService} from '../../services/routing/routing.service';
import {GeoPoint} from '../../models/geo-point';
import {RoutingDataStoreService} from '../../services/data/routing-data-store.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {addRoutingPointEvent} from '../routes/routes.component';
import {latLng, LeafletMouseEvent} from 'leaflet';
import {MatSnackBar} from '@angular/material/snack-bar';
declare var L;

export const removeRoutingPointEvent = new Subject<GeoPoint>();
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.sass']
})
export class RouteComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private mapService: MapService, private zone: NgZone, private routingService: RoutingService,
              private routingDataStoreService: RoutingDataStoreService, private snackBar: MatSnackBar) { }
  @Input()
  active = true;
  @Input()
  color: string;
  @Input()
  initialPoint: {point: GeoPoint, name: string} = null;
  @Input()
  routingMarkers: Array<RoutingMarker> = [];
  routingMarkerLayer = new L.LayerGroup();
  polyLineHoverLayer = new L.LayerGroup();
  polyLine: L.Polyline;
  checkboxActive = false;
  distance: number;
  time: number;
  @Input()
  destroy = false;
  @Input()
  routesVisible = false;
  lastUpdateTimeStamp = Date.now();

  ngOnInit(): void {
    let init = true;
    this.polyLine = L.polyline([], {
      color: this.color,
      weight: 4,
      opacity: 1,
      smoothFactor: 1
    });
    this.mapService.onClick$.subscribe(event => {
      if (!event) {
        return;
      }
      if (!this.active) {
        return;
      }
      if (!this.routesVisible) {
        return;
      }
      this.zone.run(() => {
        this.addRoutingPoint({point: new GeoPoint(event.latlng.lat, event.latlng.lng), name: ''});
      });
    });
    if (this.initialPoint) {
      this.addRoutingPoint(this.initialPoint);
    }
    addRoutingPointEvent.asObservable().subscribe(point => {
      if (init) {
        return;
      }
      if (!this.active) {
        return;
      }
      this.addRoutingPoint(point);
    });

    this.mapService.onMapReady$.subscribe((mapReady) => {
        if (mapReady) {
          this.mapService._map.addLayer(this.routingMarkerLayer);
          this.mapService._map.addLayer(this.polyLine);
          this.mapService._map.addLayer(this.polyLineHoverLayer);
        }
      }
    );
    init = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnDestroy(): void {
    this.clearList();
    this.active = false;
  }
  addRoutingPoint({point, name}) {
    const routingMarker = {color: this.getRandomColor(), geoPoint: {lat: point.lat, lon: point.lon}, name};
    this.routingMarkers.push(routingMarker);
    this.drawMarkers();
    this.updateRoute();
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  drop(event: CdkDragDrop<RoutingMarker[]>) {
    moveItemInArray(this.routingMarkers, event.previousIndex, event.currentIndex);
    this.updateRoute();
  }
  updateRoute(force: boolean = false) {
    if (Date.now() - this.lastUpdateTimeStamp < 100 && !force){
      this.snackBar.open('No Route!', 'close', {
               duration: 2000
             });
    }
    this.routingService.getRoute(this.routingMarkers.map(marker =>  marker.geoPoint), 1000)
      .subscribe((result) => {
        if (!result){
         return;
        }
        this.drawRoute(result.path.map(point => new GeoPoint(point[0], point[1])));
        this.addToSearch();
        this.time = result.distance;
        this.lastUpdateTimeStamp = Date.now();
      });
  }
  calcDistance() {
    let previousPoint: L.LatLng = null;
    let distance = 0;
    this.polyLine.getLatLngs().forEach(currLatLng => {
      if (previousPoint) {
        distance += previousPoint.distanceTo(currLatLng);
      }
      previousPoint = currLatLng;
    });
    this.distance = distance / 1000;
  }
  drawRoute(route: GeoPoint[]) {
    this.polyLine.setLatLngs([]);
    const latLngs = [];
    for (const point of route) {
      latLngs.push(L.latLng([point.lat, point.lon]));
    }
    this.polyLine.setLatLngs(latLngs);
    // this.polyLine.on('mouseover', (event: LeafletMouseEvent) => L.circle([event.latlng.lat, event.latlng.lng], {radius: 10}).addTo(this.polyLineHoverLayer));
    // this.polyLine.on('mouseout', (event: LeafletMouseEvent) => this.polyLineHoverLayer.clearLayers());
    this.calcDistance();
  }

  clearList() {
    this.polyLine.setLatLngs([]);
    this.routingMarkerLayer.clearLayers();
    this.routingMarkers = [];
    this.checkboxActive = false;
    this.distance = null;
    this.time = null;
    this.addToSearch();
  }

  addToSearch() {
    if (this.checkboxActive) {
      this.routingDataStoreService.routesToAdd.set(this.color, this.routingMarkers.map(value => value.geoPoint));
    } else {
      this.routingDataStoreService.routesToAdd.delete(this.color);
    }
  }

  removePoint(color: string) {
    this.routingMarkers = this.routingMarkers.filter(value => value.color !== color);
    this.updateRoute();
    this.drawMarkers();
  }
  drawMarkers() {
    this.routingMarkerLayer.clearLayers();
    let i = 0;
    for (const routingMarker of this.routingMarkers) {
      const redMarker = L.VectorMarkers.icon({
        icon: 'location',
        markerColor: routingMarker.color
      });
      const marker = L.marker(
        [routingMarker.geoPoint.lat, routingMarker.geoPoint.lon],
        {icon: redMarker, draggable: true});
      marker.addTo(this.routingMarkerLayer);
      marker.on('dragend', (event) => this.markerDragHandler(event, true));
      console.log(marker);
      routingMarker.leafletId = marker._leaflet_id;
      console.log(routingMarker);
      i++;
    }
  }
  markerDragHandler(event, force = false) {
    console.log(event);
    this.routingMarkers[this.findMarker(event.target._leaflet_id)].geoPoint =
      new GeoPoint(event.target._latlng.lat, event.target._latlng.lng);
    this.updateRoute(force);
  }
  findMarker(leafletid: number) {
    for (let i = 0; i < this.routingMarkers.length; i++) {
      if (this.routingMarkers[i].leafletId === leafletid) {
        return i;
      }
    }
    return -1;
  }
}
