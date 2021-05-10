import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private readonly _bounds = new BehaviorSubject<L.LatLngBounds>(null);
  readonly bounds$ = this._bounds.asObservable();

  constructor() { }
  public setBounds(bounds: L.LatLngBounds) {
    this._bounds.next(bounds);
  }
  public getBounds(): L.LatLngBounds {
    return this._bounds.getValue();
  }
}
