import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {FacetRefinements} from '../../models/oscar/refinements';
import {SearchState} from '../../models/state/search-state.enum';

@Component({
  selector: 'app-refinements',
  templateUrl: './refinements.component.html',
  styleUrls: ['./refinements.component.sass']
})
export class RefinementsComponent implements OnInit {

  constructor(private oscarService: OscarItemsService) { }

  showTable = true;
  ngOnInit() {
  }

}
