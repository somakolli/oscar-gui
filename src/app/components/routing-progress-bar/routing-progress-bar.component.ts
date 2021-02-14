import {Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {RoutingMarker} from '../../models/routing-marker';
import {CdkDragDrop} from '@angular/cdk/drag-drop/drag-events';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {RoutingService} from '../../services/routing/routing.service';
import {GeoPoint} from '../../models/geo-point';
import {RoutingDataStoreService} from '../../services/data/routing-data-store.service';
declare var L;

@Component({
  selector: 'app-routing-progress-bar',
  templateUrl: './routing-progress-bar.component.html',
  styleUrls: ['./routing-progress-bar.component.sass']
})
export class RoutingProgressBarComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private mapService: MapService, private zone: NgZone, private routingService: RoutingService,
              private routingDataStoreService: RoutingDataStoreService) { }
  @Input()
  active: boolean;
  @Input()
  color: string;
  routingMarkers: Array<RoutingMarker> = [];
  routingMarkerLayer = new L.LayerGroup();
  polyLine: L.Polyline;
  checkboxActive = false;
  @Input()
  destroy = false;

  ngOnInit(): void {
    this.polyLine = L.polyline([], {
      color: this.color,
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    });
    this.mapService.onClick$.subscribe(event => {
      if (!this.active){
        return;
      }
      if (!event) {
        return;
      }
      console.log('click routing', event);
      this.zone.run(() => {
        const routingMarker = {color: this.getRandomColor(), geoPoint: {lat: event.latlng.lat, lon: event.latlng.lng}};
        this.routingMarkers.push(routingMarker);
        this.drawMarkers();
        this.updateRoute();
      });
    });
    this.mapService.onMapReady$.subscribe((mapReady) => {
        if (mapReady) {
          this.mapService._map.addLayer(this.routingMarkerLayer);
          this.mapService._map.addLayer(this.polyLine);
        }
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  ngOnDestroy(): void {
    this.clearList();
    this.active = false;
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

  updateRoute() {
    this.routingService.getRoute(this.routingMarkers.map(marker =>  marker.geoPoint), 1000)
      .subscribe((result) => {
        this.drawRoute(result.path.map(point => new GeoPoint(point[0], point[1])));
        this.addToSearch();
      });
  }
  drawRoute(route: GeoPoint[]) {
    this.polyLine.setLatLngs([]);
    const latLngs = [];
    for (const point of route) {
      latLngs.push(L.latLng([point.lat, point.lon]));
    }
    this.polyLine.setLatLngs(latLngs);
  }

  clearList() {
    this.polyLine.setLatLngs([]);
    this.routingMarkerLayer.clearLayers();
    this.routingMarkers = [];
    this.checkboxActive = false;
    this.addToSearch();
  }

  addToSearch() {
    if (this.checkboxActive) {
      this.routingDataStoreService.routesToAdd.set(this.color, this.routingMarkers.map(value => value.geoPoint));
    } else {
      this.routingDataStoreService.routesToAdd.delete(this.color);
    }
    console.log(this.routingDataStoreService.routesToAdd);
  }

  removePoint(color: string) {
    this.routingMarkers = this.routingMarkers.filter(value => value.color !== color);
    this.updateRoute();
    this.drawMarkers();
  }
  drawMarkers() {
    this.routingMarkerLayer.clearLayers();
    for (const routingMarker of this.routingMarkers) {
      const redMarker = L.VectorMarkers.icon({
        icon: 'location',
        markerColor: routingMarker.color
      });
      L.marker([routingMarker.geoPoint.lat, routingMarker.geoPoint.lon], {icon: redMarker}).addTo(this.routingMarkerLayer);
    }
  }
}
