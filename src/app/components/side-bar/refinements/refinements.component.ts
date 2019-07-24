import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../../services/state/search.service';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {FacetRefinements} from '../../../models/oscar/refinements';

@Component({
  selector: 'app-refinements',
  templateUrl: './refinements.component.html',
  styleUrls: ['./refinements.component.sass']
})
export class RefinementsComponent implements OnInit {

  constructor(private searchService: SearchService, private oscarService: OscarItemsService) { }
  facets: FacetRefinements;
  ngOnInit() {
    this.searchService.queryString$.subscribe(queryString => {
      console.log(queryString);
      this.oscarService.getFacets(queryString).subscribe( facets => {
        this.facets = facets;
      });
    });
  }

}
