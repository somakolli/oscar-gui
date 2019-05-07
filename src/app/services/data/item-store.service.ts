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
  private readonly _binaryItemsArray = new BehaviorSubject<Uint32Array>(new Uint32Array(0));
  readonly binaryItemsArray$ = this._binaryItemsArray.asObservable();
  private readonly _currentBinaryItems = new BehaviorSubject<OscarMinItem[]>([]);
  readonly currentBinaryItems$ = this._currentBinaryItems.asObservable();
  private readonly _currentItemIds = new BehaviorSubject<number[]>([]);
  readonly currentItemIds$ = this._currentItemIds.asObservable();
  private readonly _currentBinaryItemsMap = new BehaviorSubject<Map<string, number[]>>(new Map<string, number[]>());
  readonly currentBinaryItemsMap$ = this._currentBinaryItemsMap.asObservable();
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
  get binaryItemsArray(): Uint32Array {
    return this._binaryItemsArray.getValue();
  }
  set binaryItemsArray(val: Uint32Array) {
    this._binaryItemsArray.next(val);
  }
  get currentBinaryItems(): OscarMinItem[] {
    return this._currentBinaryItems.getValue();
  }
  set currentBinaryItems(val: OscarMinItem[]) {
    this._currentBinaryItems.next(val);
  }
  get currentBinaryItemsMap(): Map<string, number[]> {
    return this._currentBinaryItemsMap.getValue();
  }
  set currentBinaryItemsMap(val: Map<string, number[]>) {
    this._currentBinaryItemsMap.next(val);
  }
  get currentItemIds(): number[] {
    return this._currentItemIds.getValue();
  }
  set currentItemIds(val: number[]) {
    this._currentItemIds.next(val);
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
