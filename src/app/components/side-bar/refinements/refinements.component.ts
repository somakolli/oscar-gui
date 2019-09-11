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

  showTable = true;
  ngOnInit() {
  }

}
