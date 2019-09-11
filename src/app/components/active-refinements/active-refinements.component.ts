import {Component, OnInit} from '@angular/core';
import {RefinementsService} from '../../../services/data/refinements.service';
import {ActiveRefinement, RefinementType} from '../../../models/gui/refinement';

@Component({
  selector: 'app-active-refinements',
  templateUrl: './active-refinements.component.html',
  styleUrls: ['./active-refinements.component.sass']
})
export class ActiveRefinementsComponent implements OnInit {

  keyValueRefinements: ActiveRefinement[];
  keyRefinements: ActiveRefinement[];
  parentRefinements: ActiveRefinement[];
  exKeyValueRefinements: ActiveRefinement[];
  exKeyRefinements: ActiveRefinement[];
  exParentRefinements: ActiveRefinement[];
  constructor(public refinementsService: RefinementsService) { }
  ngOnInit() {
    this.refinementsService.refinements$.subscribe(refinements => {
      this.keyValueRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.KeyValue && refinement.excluding === false);
      this.exKeyValueRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.KeyValue && refinement.excluding === true);
      this.keyRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.Key && refinement.excluding === false);
      this.exKeyRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.Key && refinement.excluding === true);
      this.parentRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.Parent && refinement.excluding === false);
      this.exParentRefinements = refinements.filter((refinement) =>
        refinement.refinementType === RefinementType.Parent && refinement.excluding === true);
    });
  }

  removeRefinement(refinement: ActiveRefinement) {
    this.refinementsService.removeRefinement(refinement);
  }
}
