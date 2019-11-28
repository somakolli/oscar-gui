import {Component, NgZone, OnInit} from '@angular/core';
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
export class FacetsComponent implements OnInit {

  constructor(private searchService: SearchService, private oscarService: OscarItemsService, private zone: NgZone, private refinementsService: RefinementsService) { }
  queryId = 0;
  facets: FacetRefinements;
  ngOnInit() {
    this.searchService.newQuery$.subscribe(queryState => {
        this.facets = null;
        this.oscarService.getFacets(this.searchService.getQuery(), this.queryId).subscribe( facets => {
          this.facets = facets;
          this.refinementsService.loadedFacetRefinements = this.facets.clustering.length > 0;
        });
    });
  }
}
