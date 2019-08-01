import { Component, OnInit } from '@angular/core';
import {FacetRefinements} from '../../../../models/oscar/refinements';
import {SearchService} from '../../../../services/state/search.service';
import {OscarItemsService} from '../../../../services/oscar/oscar-items.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.sass']
})
export class FacetsComponent implements OnInit {

  constructor(private searchService: SearchService, private oscarService: OscarItemsService) { }

  facets: FacetRefinements;
  ngOnInit() {
    this.searchService.queryString$.subscribe(queryString => {
      this.oscarService.getFacets(queryString).subscribe( facets => {
        this.facets = facets;
      });
    });
  }

}
