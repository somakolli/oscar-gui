import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TagSuggestion} from '../../models/osm/tag-suggestion';
import {KeyRefinement, KeyValueRefinement} from '../../models/gui/refinement';

@Injectable({
  providedIn: 'root'
})
export class RefinementsService {

  // tslint:disable-next-line:variable-name
  private readonly _keyRefinements = new BehaviorSubject<KeyRefinement[]>([]);
  readonly keyRefinements$ = this._keyRefinements.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _keyValueRefinements = new BehaviorSubject<KeyValueRefinement[]>([]);
  readonly keyValueRefinements$ = this._keyValueRefinements.asObservable();

  constructor() { }
  setKeyRefinements(keyRefinements: KeyRefinement[]) {
    this._keyRefinements.next(keyRefinements);
  }
  setKeyValueRefinements(keyValueRefinements: KeyValueRefinement[]) {
    this._keyValueRefinements.next(keyValueRefinements);
  }
  addKeyValueRefinement(keyValueRefinement: KeyValueRefinement) {
    this._keyValueRefinements.next(this._keyValueRefinements.getValue().concat(keyValueRefinement));
  }

  addKeyRefinement(keyRefinement: KeyRefinement) {
    this._keyRefinements.next(this._keyRefinements.getValue().concat(keyRefinement));
  }
}
