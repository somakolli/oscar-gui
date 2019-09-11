import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../../../services/state/search.service';
import {OscarItemsService} from '../../../../services/oscar/oscar-items.service';
import {ParentRefinements} from '../../../../models/oscar/refinements';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.sass']
})
export class ParentsComponent implements OnInit {
  parents: ParentRefinements;

  constructor(private searchService: SearchService, private oscarService: OscarItemsService) { }

  ngOnInit() {
    this.searchService.queryString$.subscribe(queryString => {
      if (queryString === '') {
        return;
      }
      this.oscarService.getParents(queryString).subscribe( parents => {
        this.parents = parents;
      });
    });
  }

}
