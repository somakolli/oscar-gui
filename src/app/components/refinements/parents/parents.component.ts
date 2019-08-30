import {Component, NgZone, OnInit} from '@angular/core';
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
  queryId: 0;
  constructor(private searchService: SearchService, private oscarService: OscarItemsService, private zone: NgZone) { }

  ngOnInit() {
    this.queryId = 0;
    this.searchService.newQuery$.subscribe(searchState => {
      if (searchState === SearchState.Success || searchState === SearchState.ToManyItems) {
        this.parents = null;
        this.queryId++;
        console.log(this.queryId);
        this.oscarService.getParents(this.searchService.getQuery(), this.queryId).subscribe( parents => {
          console.log(this.queryId);
          console.log(parents.queryId);
          if (parents.queryId === this.queryId) {
              this.parents = parents;
              console.log(this.parents);
          }
        });
      }
    });
  }

}
