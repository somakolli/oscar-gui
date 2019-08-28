import { Component, OnInit } from '@angular/core';
import {RefinementsService} from '../../services/data/refinements.service';
import {KeyRefinement, KeyValueRefinement} from '../../models/gui/refinement';

@Component({
  selector: 'app-active-refinements',
  templateUrl: './active-refinements.component.html',
  styleUrls: ['./active-refinements.component.sass']
})
export class ActiveRefinementsComponent implements OnInit {

  keyValueRefinements: KeyValueRefinement[];
  keyRefinements: KeyRefinement[];
  parentRefinements: string[];
  exKeyValueRefinements: KeyValueRefinement[];
  exKeyRefinements: KeyRefinement[];
  exParentRefinements: string[];
  constructor(private refinementsService: RefinementsService) { }
  ngOnInit() {
    this.refinementsService.keyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValueRefinements = keyValueRefinements;
    });
    this.refinementsService.keyRefinements$.subscribe(keyRefinements => {
      this.keyRefinements = keyRefinements;
    });
    this.refinementsService.parentRefinements$.subscribe(keyRefinements => {
      this.parentRefinements = keyRefinements;
    });
    this.refinementsService.exKeyValueRefinements$.subscribe(keyValueRefinements => {
      this.exKeyValueRefinements = keyValueRefinements;
    });
    this.refinementsService.exKeyRefinements$.subscribe(keyRefinements => {
      this.exKeyRefinements = keyRefinements;
    });
    this.refinementsService.exParentRefinements$.subscribe(keyRefinements => {
      this.exParentRefinements = keyRefinements;
    });
  }

  removeRefinement(refinement: KeyValueRefinement) {
    this.refinementsService.removeRefinement(refinement);
  }
  removeKeyRefinement(refinement: KeyRefinement) {
    this.refinementsService.removeKeyRefinement(refinement);
  }
  removeParentRefinement(refinement: string) {
    this.refinementsService.removeParentRefinement(refinement);
  }
  removeExRefinement(refinement: KeyValueRefinement) {
    this.refinementsService.removeExRefinement(refinement);
  }
  removeExKeyRefinement(refinement: KeyRefinement) {
    this.refinementsService.removeExKeyRefinement(refinement);
  }
  removeExParentRefinement(refinement: string) {
    this.refinementsService.removeExParentRefinement(refinement);
  }
}
