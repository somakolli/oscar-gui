import { Component, OnInit } from '@angular/core';
import {RoutingPath} from '../../models/routing/routing';
import {SearchService} from '../../services/state/search.service';
import {GeoPoint} from '../../models/geo-point';
import {RoutingService} from '../../services/routing/routing.service';
import {MapService} from '../../services/map/map.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.sass']
})
export class RoutingComponent implements OnInit {
  source = new GeoPoint(49, 9);
  target = new GeoPoint(49, 8);
  constructor(public searchService: SearchService, public routingService: RoutingService, public mapService: MapService) { }

  ngOnInit(): void {
  }
  showSearch() {
    this.searchService.setShowRouting(false);
  }

  getRoute() {
    this.routingService.getRoute(this.source, this.target).subscribe(response => {
      console.log('response', response);
      this.mapService.drawRoute(RoutingPath.getGeoPoints(response.path));
    });
  }
}
