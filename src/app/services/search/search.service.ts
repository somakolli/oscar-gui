import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  queryToDraw = new BehaviorSubject<string>('');
  readonly queryToDraw$ = this.queryToDraw.asObservable();
  constructor() { }
}
