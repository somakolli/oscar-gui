import { Component, OnInit } from '@angular/core';
import {SuggestionsService} from '../../../../services/data/suggestions.service';
import {Suggestion, TagSuggestion} from '../../../../models/osm/tag-suggestion';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.sass']
})
export class SuggestionsComponent implements OnInit {

  currentSuggestions: Suggestion[];
  constructor(private suggestionsStore: SuggestionsService) { }

  ngOnInit() {
    this.suggestionsStore.suggestions$.subscribe(suggestions => {
      if (suggestions) {
        this.currentSuggestions = suggestions.data;
      } else {
        this.currentSuggestions = [];
      }
    });
  }

  setSelectedSuggestion(suggestion: Suggestion) {
    this.suggestionsStore.setSuggestions(null);
    this.suggestionsStore.setSelectedSuggestion(suggestion);
  }
}
