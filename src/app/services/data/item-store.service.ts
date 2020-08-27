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
  private readonly _itemIdsSortedByDistanceFinished = new BehaviorSubject<number>(0);
  readonly itemIdsSortedByDistanceFinished$ = this._itemIdsSortedByDistanceFinished.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _highlightedItem = new BehaviorSubject<OscarItem>(null);
  readonly highlightedItem$ = this._highlightedItem.asObservable();
  private readonly _radiusChange = new BehaviorSubject<number>(10000);
  readonly radiusChange$ = this._radiusChange.asObservable();
  currentItemIds = new Array<OscarMinItem>();
  binaryItems = new Array<OscarMinItem>();
  distanceSortedItems = new Array<OscarMinItem>();
  streets = false;
  constructor() { }
  currentItemIdsFinished() {
    this._currentItemIdsFinished.next(this._currentItemIdsFinished.getValue() + 1);
  }
  binaryItemsFinished() {
    this._binaryItemsFinished.next(this._binaryItemsFinished.getValue() + 1);
  }
  sortedItemsFinished() {
    this._itemIdsSortedByDistanceFinished.next(this._itemIdsSortedByDistanceFinished.getValue() + 1);
  }
  get currentItemIdsStatus() {
    return this._currentItemIdsFinished.getValue();
  }
  setHighlightedItem(item: OscarItem) {
    this._highlightedItem.next(item);
  }
  get radius() {
    return this._radiusChange.getValue();
  }
  changeRadius(radius: number) {
    this._radiusChange.next(radius);
  }
}
