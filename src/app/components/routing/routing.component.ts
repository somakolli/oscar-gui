import { Component, OnInit } from '@angular/core';
import {RoutingPath} from '../../models/routing/routing';
import {SearchService} from '../../services/state/search.service';
import {GeoPoint} from '../../models/geo-point';
import {RoutingService} from '../../services/routing/routing.service';
import {MapService} from '../../services/map/map.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
<<<<<<< HEAD
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
=======
>>>>>>> store-data-in-components

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.sass']
})
export class RoutingComponent implements OnInit {
  source = new GeoPoint(49, 9);
  target = new GeoPoint(49, 8);
  distance = 0;
<<<<<<< HEAD
  maxCellDiag = 1000;
=======
>>>>>>> store-data-in-components
  constructor(public searchService: SearchService, public routingService: RoutingService, public mapService: MapService,
              public oscarItemsService: OscarItemsService) { }

  ngOnInit(): void {
  }
  showSearch() {
    this.searchService.setShowRouting(false);
  }

  getRoute() {
<<<<<<< HEAD
    this.routingService.getRoute(this.source, this.target, this.maxCellDiag).subscribe(response => {
      this.routingService.currentRoute = response;
      this.distance = response.distance;
      this.mapService.drawRoute(RoutingPath.getGeoPoints(response.path));
      this.mapService.clearRects();
      let heatmapItems = new Array<OscarMinItem>();
      heatmapItems = this.oscarItemsService.binaryItemsToOscarMin(this._base64ToArrayBuffer(response.itemsBinary));
      /*for (const cell of response.cells) {
        heatmapItems = heatmapItems.concat(items);
        this.mapService.drawRect(cell.id.toString(10),
          new L.LatLngBounds(new L.LatLng(cell.leafletBoundary[1], cell.leafletBoundary[0]),
            new L.LatLng(cell.leafletBoundary[3], cell.leafletBoundary[2])),
            'blue', 1, cell.id.toString(10));
      }*/
      this.mapService.drawItemsHeatmap(heatmapItems, 1);
      console.log(response);
    });
  }
  _base64ToArrayBuffer(base64) {
    console.log(base64);
=======
    this.routingService.getRoute(this.source, this.target).subscribe(response => {
      this.distance = response.distance;
      this.mapService.drawRoute(RoutingPath.getGeoPoints(response.path));
      const items = this.oscarItemsService.binaryItemsToOscarMin(this._base64ToArrayBuffer(response.itemsBinary));
      this.mapService.drawItemsHeatmap(items, 1);
      console.log(items);
    });
  }
  _base64ToArrayBuffer(base64) {
>>>>>>> store-data-in-components
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
