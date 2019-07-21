import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {
  // tslint:disable-next-line:variable-name
  private readonly _binaryItemsFinished = new BehaviorSubject<number>(0);
  readonly binaryItemsFinished$ = this._binaryItemsFinished.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _currentItemIdsFinished = new BehaviorSubject<number>(0);
  readonly currentItemIdsFinished$ = this._currentItemIdsFinished.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _highlightedItem = new BehaviorSubject<OscarItem>(null);
  readonly highlightedItem$ = this._highlightedItem.asObservable();
  currentItemIds = new Array<OscarMinItem>();
  binaryItems = new Array<OscarMinItem>();
  streets = false;
  constructor() { }
  currentItemIdsFinished() {
    this._currentItemIdsFinished.next(this._currentItemIdsFinished.getValue() + 1);
  }
  binaryItemsFinished() {
    this._binaryItemsFinished.next(this._binaryItemsFinished.getValue() + 1);
  }
  get currentItemIdsStatus() {
    return this._currentItemIdsFinished.getValue();
  }
  setHighlightedItem(item: OscarItem) {
    this._highlightedItem.next(item);
  }
}
