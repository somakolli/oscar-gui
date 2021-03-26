import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ParentRefinements} from '../../../models/oscar/refinements';

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
    if (this.parents && this.parents.clustering.length > 0) {
      document.getElementById('parentsDiv').scrollIntoView();
    }
  }
}
