import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TagSuggestion} from '../../models/osm/tag-suggestion';
import {KeyRefinement, KeyValueRefinement} from '../../models/gui/refinement';
import {_} from 'underscore';

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
  // tslint:disable-next-line:variable-name
  private readonly _parentRefinements = new BehaviorSubject<string[]>([]);
  readonly parentRefinements$ = this._parentRefinements.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _exKeyRefinements = new BehaviorSubject<KeyRefinement[]>([]);
  readonly exKeyRefinements$ = this._exKeyRefinements.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _exKeyValueRefinements = new BehaviorSubject<KeyValueRefinement[]>([]);
  readonly exKeyValueRefinements$ = this._exKeyValueRefinements.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _exParentRefinements = new BehaviorSubject<string[]>([]);
  readonly exParentRefinements$ = this._exParentRefinements.asObservable();

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
  addParentRefinement(parentRefinement: string) {
    this._parentRefinements.next(this._parentRefinements.getValue().concat(parentRefinement));
  }

  removeRefinement(refinement: KeyValueRefinement) {
    this._keyValueRefinements.next(_.reject(this._keyValueRefinements.getValue(),
      el => {
      return el.key === refinement.key && el.value === refinement.value;
    }));
  }
  removeKeyRefinement(refinement: KeyRefinement) {
    this._keyRefinements.next(_.reject(this._keyRefinements.getValue(),
      el => {
      return el.key === refinement.key;
    }));
  }
  removeParentRefinement(refinement: string) {
    this._parentRefinements.next(_.reject(this._parentRefinements.getValue(),
      el => {
      return el === refinement;
    }));
  }
  addExKeyValueRefinement(keyValueRefinement: KeyValueRefinement) {
    this._exKeyValueRefinements.next(this._exKeyValueRefinements.getValue().concat(keyValueRefinement));
  }

  addExKeyRefinement(keyRefinement: KeyRefinement) {
    this._exKeyRefinements.next(this._exKeyRefinements.getValue().concat(keyRefinement));
  }
  addExParentRefinement(parentRefinement: string) {
    this._exParentRefinements.next(this._exParentRefinements.getValue().concat(parentRefinement));
  }

  removeExRefinement(refinement: KeyValueRefinement) {
    this._exKeyValueRefinements.next(_.reject(this._exKeyValueRefinements.getValue(),
      el => {
      return el.key === refinement.key && el.value === refinement.value;
    }));
  }
  removeExKeyRefinement(refinement: KeyRefinement) {
    this._exKeyRefinements.next(_.reject(this._exKeyRefinements.getValue(),
      el => {
      return el.key === refinement.key;
    }));
  }
  removeExParentRefinement(refinement: string) {
    this._exParentRefinements.next(_.reject(this._exParentRefinements.getValue(),
      el => {
      return el === refinement;
    }));
  }
  hasKeyRefinement(refinement: KeyRefinement): boolean {
    return _.contains(this._keyRefinements.getValue(), refinement);
  }
  getParentRefinements(): string[] {
    return this._parentRefinements.getValue();
  }
  getKeyRefinements(): KeyRefinement[] {
    return this._keyRefinements.getValue();
  }
  getExKeyRefinements(): KeyRefinement[] {
    return this._exKeyRefinements.getValue();
  }
  getKeyValueRefinements(): KeyValueRefinement[] {
    return this._keyValueRefinements.getValue();
  }
  getExKeyValueRefinements(): KeyValueRefinement[] {
    return this._exKeyValueRefinements.getValue();
  }
}
