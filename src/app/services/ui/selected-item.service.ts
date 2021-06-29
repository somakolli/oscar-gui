import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OscarItem} from '../../models/oscar/oscar-item';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {

  public subject = new BehaviorSubject<OscarItem>(null);
  constructor() { }
}
