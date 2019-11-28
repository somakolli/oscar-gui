import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TagSuggestion} from '../../models/osm/tag-suggestion';
import {_} from 'underscore';
import {ActiveRefinement} from '../../models/gui/refinement';

@Injectable({
  providedIn: 'root'
})
export class RefinementsService {
  loadedParentRefinements = false;
  loadedFacetRefinements = false;
  // tslint:disable-next-line:variable-name
  private readonly _refinements = new BehaviorSubject<ActiveRefinement[]>([]);
  readonly refinements$ = this._refinements.asObservable();
  constructor() { }
  hasRefinements(): boolean {
    return this._refinements.value.length > 0;
  }
  clearRefinements() {
    this._refinements.next([]);
  }
  addRefinement(keyValueRefinement: ActiveRefinement) {
    this._refinements.next(this._refinements.getValue().concat(keyValueRefinement));
  }

  removeRefinement(refinement: ActiveRefinement) {
    this._refinements.next(_.reject(this._refinements.getValue(),
      el => {
        return el.key === refinement.key && el.value === refinement.value
          && el.excluding === refinement.excluding && el.refinementType === refinement.refinementType;
      }));
  }
  getRefinements(): ActiveRefinement[] {
    return this._refinements.getValue();
  }
}
