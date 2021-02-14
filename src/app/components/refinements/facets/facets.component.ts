import {Component, Input, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FacetRefinements} from '../../../models/oscar/refinements';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.sass']
})
export class FacetsComponent implements OnInit, OnChanges {
  constructor() { }
  queryId = 0;
  show = false;
  @Input()
  facets: FacetRefinements;
  ngOnInit() {
    this.checkVisibility();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkVisibility();
    if (this.show && document.getElementById('refinementsDiv')) {
      document.getElementById('refinementsDiv').scrollIntoView({behavior: 'auto'});
    }
  }
  checkVisibility() {
    this.show = this.facets && this.facets.clustering.length > 0;
  }
}
