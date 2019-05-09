import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {
  private readonly _binaryItemsFinished = new BehaviorSubject<number>(0);
  readonly binaryItemsFinished$ = this._binaryItemsFinished.asObservable();
  private readonly _currentItemIdsFinished = new BehaviorSubject<number>(0);
  readonly currentItemIdsFinished$ = this._currentItemIdsFinished.asObservable();
  currentItemIds = new Array<OscarMinItem>();
  binaryItems = new Array<OscarMinItem>();
  constructor() { }
  currentItemIdsFinished() {
    this._currentItemIdsFinished.next(this._currentItemIdsFinished.getValue() + 1);
    console.log('currentItemIdsFinished()');
  }
  binaryItemsFinished() {
    this._binaryItemsFinished.next(this._binaryItemsFinished.getValue() + 1);
    console.log('binaryItemsFinished()');
  }
  get currentItemIdsStatus() {
    return this._currentItemIdsFinished.getValue();
  }
}
