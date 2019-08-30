import {Component, OnInit} from '@angular/core';
import {FacetRefinements} from '../../../models/oscar/refinements';
import {SearchService} from '../../../services/state/search.service';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {SearchState} from '../../../models/state/search-state.enum';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.sass']
})
export class FacetsComponent implements OnInit {

  constructor(private searchService: SearchService, private oscarService: OscarItemsService) { }

  facets: FacetRefinements;
  ngOnInit() {
    this.searchService.newQuery$.subscribe(queryState => {
      if (queryState === SearchState.Success) {
        this.oscarService.getFacets(this.searchService.getQuery(), this.searchService.queryId).subscribe( facets => {
          if (facets.queryId === this.searchService.queryId) {
            this.facets = facets;
          }
        });
      } else {
        this.facets = null;
      }
    });
  }
}
