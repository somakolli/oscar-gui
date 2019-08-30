import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Suggestion, TagSuggestion} from '../../models/osm/tag-suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  // tslint:disable-next-line:variable-name
  private readonly _suggestions = new BehaviorSubject<TagSuggestion>(null);
  readonly suggestions$ = this._suggestions.asObservable();
  // tslint:disable-next-line:variable-name
  private readonly _selectedSuggestion = new BehaviorSubject<Suggestion>(null);
  readonly selectedSuggestion$ = this._selectedSuggestion.asObservable();
  constructor() { }
  setSuggestions(suggestions: TagSuggestion) {
    this._suggestions.next(suggestions);
  }
  setSelectedSuggestion(suggestion: Suggestion) {
    this._selectedSuggestion.next(suggestion);
  }
}
