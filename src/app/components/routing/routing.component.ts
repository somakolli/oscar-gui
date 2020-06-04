import { Component, OnInit } from '@angular/core';
import {RoutingPath} from '../../models/routing/routing';
import {SearchService} from '../../services/state/search.service';
import {GeoPoint} from '../../models/geo-point';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.sass']
})
export class RoutingComponent implements OnInit {
  source = new GeoPoint(49, 9);
  target = new GeoPoint(49, 8);
  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
  }
  showSearch() {
    this.searchService.setShowRouting(false);
  }
}
