import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {
  private readonly _items = new BehaviorSubject<OscarItem[]>([]);
  readonly items$ = this._items.asObservable();
  private readonly _currentItems = new BehaviorSubject<OscarItem[]>([]);
  readonly currentItems$ = this._currentItems.asObservable();
  private readonly _binaryItems = new BehaviorSubject<OscarMinItem[]>([]);
  readonly binaryItems$ = this._binaryItems.asObservable();
  private readonly _currentBinaryItems = new BehaviorSubject<OscarMinItem[]>([]);
  readonly currentBinaryItems$ = this._currentBinaryItems.asObservable();
  constructor() { }
  get items(): OscarItem[] {
    return this._items.getValue();
  }
  set items(val: OscarItem[]) {
    this._items.next(val);
  }
  get currentItems(): OscarItem[] {
    return this._currentItems.getValue();
  }
  set currentItems(val: OscarItem[]) {
    this._currentItems.next(val);
  }
  get binaryItems(): OscarMinItem[] {
    return this._binaryItems.getValue();
  }
  set binaryItems(val: OscarMinItem[]) {
    this._binaryItems.next(val);
  }
  get currentBinaryItems(): OscarMinItem[] {
    return this._currentBinaryItems.getValue();
  }
  set currentBinaryItems(val: OscarMinItem[]) {
    this._currentBinaryItems.next(val);
  }
  addItem(item: OscarItem) {
    this.items = [
      ...this.items,
      item
    ];
  }
  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }
}
