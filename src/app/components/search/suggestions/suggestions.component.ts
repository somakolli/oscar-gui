import {Component, OnInit, Renderer2} from '@angular/core';
import {SuggestionsService} from '../../../services/data/suggestions.service';
import {Suggestion, TagSuggestion} from '../../../models/osm/tag-suggestion';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.sass']
})
export class SuggestionsComponent implements OnInit {

  currentSuggestions: Suggestion[];
  hidden = true;
  constructor(private suggestionsStore: SuggestionsService, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('window', 'click', (e) => {this.hidden = true;});
    this.suggestionsStore.suggestions$.subscribe(suggestions => {
      this.hidden = false;

      if (suggestions) {
        // filter out invalid values
        this.currentSuggestions = suggestions.data.filter( suggestion => !suggestion.value.includes(' ') &&  !suggestion.key.includes(' '));
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
