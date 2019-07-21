import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SearchState} from '../../models/state/search-state.enum';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly _newQuery = new BehaviorSubject<SearchState>(0);
  readonly newQuery$ = this._newQuery.asObservable();
  constructor() { }
  setState(state: SearchState) {
    this._newQuery.next(state);
  }
  getState(): SearchState {
    return this._newQuery.getValue();
  }

}
