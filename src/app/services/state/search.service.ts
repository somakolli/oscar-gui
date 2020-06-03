import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InitState, SearchState} from '../../models/state/search-state.enum';
import {LatLngBounds} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly _newQuery = new BehaviorSubject<SearchState>(0);
  readonly newQuery$ = this._newQuery.asObservable();
  private readonly _initState = new BehaviorSubject<InitState>(0);
  readonly initState$ = this._initState.asObservable();
  private readonly _queryString = new BehaviorSubject<string>('');
  readonly queryString$ = this._queryString.asObservable();
  private readonly _partQueryString = new BehaviorSubject<string>('');
  readonly inputQueryString$ = this._partQueryString.asObservable();
  private readonly _latLongBounds = new BehaviorSubject<LatLngBounds>(null);
  readonly latLongBounds$ = this._latLongBounds.asObservable();
  private readonly _showRouting = new BehaviorSubject<boolean>(false);
  readonly showRouting$ = this._showRouting.asObservable();
  queryId = 0;
  constructor() { }
  setState(state: SearchState) {
    this._newQuery.next(state);
  }
  getState(): SearchState {
    return this._newQuery.getValue();
  }
  setInitState(state: InitState) {
    this._initState.next(state);
  }
  getInitState(): InitState {
    return this._initState.getValue();
  }
  setQuery(query: string) {
    this._queryString.next(query);
  }
  getQuery() {
    return this._queryString.getValue();
  }
  setInputQueryString(query: string) {
    console.log(query);
    this._partQueryString.next(query);
  }

  setBoundingBox(latLngBounds: LatLngBounds) {
    this._latLongBounds.next(latLngBounds);
  }
  getBoundingBox(): LatLngBounds {
    return this._latLongBounds.getValue();
  }
  getShowRouting(): boolean {
    return this._showRouting.getValue();
  }
  setShowRouting(visibility: boolean) {
    this._showRouting.next(visibility);
  }
}
