import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SearchState} from '../../models/state/search-state.enum';
import {LatLngBounds} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly _newQuery = new BehaviorSubject<SearchState>(0);
  readonly newQuery$ = this._newQuery.asObservable();
  private readonly _queryString = new BehaviorSubject<string>('');
  readonly queryString$ = this._queryString.asObservable();
  private readonly _partQueryString = new BehaviorSubject<string>('');
  readonly inputQueryString$ = this._partQueryString.asObservable()
  private readonly _latLongBounds = new BehaviorSubject<LatLngBounds>(null);
  readonly latLongBounds$ = this._latLongBounds.asObservable();
  queryId = 0;
  constructor() { }
  setState(state: SearchState) {
    this._newQuery.next(state);
  }
  getState(): SearchState {
    return this._newQuery.getValue();
  }
  setQuery(query: string) {
    this._queryString.next(query);
  }
  getQuery() {
    return this._queryString.getValue();
  }
  setInputQueryString(query: string) {
    this._partQueryString.next(query);
  }

  setBoundingBox(latLngBounds: LatLngBounds) {
    this._latLongBounds.next(latLngBounds);
  }
  getBoundingBox(): LatLngBounds {
    return this._latLongBounds.getValue();
  }
}
