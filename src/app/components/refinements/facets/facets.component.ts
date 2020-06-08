import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FacetRefinements} from '../../../models/oscar/refinements';
import {SearchService} from '../../../services/state/search.service';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {SearchState} from '../../../models/state/search-state.enum';
import {RefinementsService} from '../../../services/data/refinements.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.sass']
})
export class FacetsComponent implements OnInit, OnChanges {
  constructor(private searchService: SearchService, private oscarService: OscarItemsService, private zone: NgZone, private refinementsService: RefinementsService) { }
  queryId = 0;
  show = false;
  @Input()
  facets: FacetRefinements;
  ngOnInit() {
    this.checkVisibility();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkVisibility();
    if (this.show) {
      document.getElementById('refinementsDiv').scrollIntoView({behavior: 'auto'});
    }
  }
  checkVisibility() {
    if (this.facets && this.facets.clustering.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
}
