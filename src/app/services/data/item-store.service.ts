import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {
  private readonly _items = new BehaviorSubject<OscarItem[]>([]);
  readonly items$ = this._items.asObservable();
  constructor() { }
  get items(): OscarItem[] {
    return this._items.getValue();
  }
  set items(val: OscarItem[]) {
    this._items.next(val);
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
