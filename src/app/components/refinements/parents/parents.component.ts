import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../../services/state/search.service';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {ParentRefinements} from '../../../models/oscar/refinements';
import {SearchState} from '../../../models/state/search-state.enum';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.sass']
})
export class ParentsComponent implements OnInit {
  parents: ParentRefinements;

  constructor(private searchService: SearchService, private oscarService: OscarItemsService) { }

  ngOnInit() {
    this.searchService.newQuery$.subscribe(searchState => {
      if (searchState === SearchState.Success) {
        this.oscarService.getParents(this.searchService.getQuery()).subscribe( parents => {
          this.parents = parents;
        });
      }
    });
  }

}
