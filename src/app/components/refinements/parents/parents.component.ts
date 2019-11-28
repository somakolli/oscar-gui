import {Component, NgZone, OnInit} from '@angular/core';
import {SearchService} from '../../../services/state/search.service';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {ParentRefinements} from '../../../models/oscar/refinements';
import {SearchState} from '../../../models/state/search-state.enum';
import {RefinementsService} from '../../../services/data/refinements.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.sass']
})
export class ParentsComponent implements OnInit {
  parents: ParentRefinements;
  lastQuery = '';
  queryId: 0;
  constructor(private searchService: SearchService, private oscarService: OscarItemsService, private zone: NgZone, private refinementsService: RefinementsService) { }

  ngOnInit() {
    this.queryId = 0;
    this.searchService.newQuery$.subscribe(searchState => {
      if (this.lastQuery !== this.searchService.getQuery()) {
        this.queryId++;
        this.lastQuery = this.searchService.getQuery();
      }
      this.oscarService.getParents(this.searchService.getQuery(), this.queryId).subscribe( parents => {
          this.parents = parents;
          this.refinementsService.loadedParentRefinements = parents.clustering.length > 0;
      });
    });
  }

}
