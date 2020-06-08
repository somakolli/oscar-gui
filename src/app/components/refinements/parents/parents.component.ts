import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ParentsComponent implements OnInit, OnChanges {

  @Input()
  parents: ParentRefinements;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    if (this.parents && this.parents.clustering.length > 0) {
      document.getElementById('parentsDiv').scrollIntoView();
    }
  }
}
