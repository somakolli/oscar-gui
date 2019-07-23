import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../../services/data/item-store.service';
import {SearchService} from '../../../services/state/search.service';
import {SearchState} from '../../../models/state/search-state.enum';
import {OsmService} from '../../../services/osm/osm.service';
import {SuggestionsService} from '../../../services/data/suggestions.service';
import {RefinementsService} from '../../../services/data/refinements.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService, public searchService: SearchService,
              private osmService: OsmService, private suggestionStore: SuggestionsService, private refinementStore: RefinementsService) { }
  error = false;
  prepend = '';
  queryString = '';
  prependix = '';
  ngOnInit() {
    this.suggestionStore.selectedSuggestion$.subscribe(suggestion => {
      if (suggestion) {
        const strings = this.queryString.split(' ');
        this.queryString = this.queryString.replace(strings[strings.length - 1], `@${suggestion.key}:${suggestion.value}`);
      }
    });
    this.refinementStore.keyValueRefinements$.subscribe(keyValueRefinements => {
      this.prependix = '';
      keyValueRefinements.forEach(refinement => {
        this.prependix += `@${refinement.key}:${refinement.value} `;
      });
    });
    this.refinementStore.keyRefinements$.subscribe(keyRefinements => {
      this.prependix = '';
      keyRefinements.forEach(refinement => {
        this.prependix += `@${refinement.key} `;
      });
    });
  }
  search(): void {
    this.searchService.setState(SearchState.Pending);
    this.itemStore.setHighlightedItem(null);
    this.oscarItemService.getApxItemCount(this.queryString).subscribe(apxStats => {
      if (apxStats.items < 1000000) {
        this.oscarItemService.getItemsBinary(this.prependix + this.queryString);
        this.searchService.setState(SearchState.Success);
        this.error = false;
      } else {
        this.searchService.setState(SearchState.ToManyItems);
        this.error = true;
      }
    });
  }

  inputUpdate() {
    const strings = this.queryString.split(' ');
    const potentialQueryString = strings[strings.length - 1];
    if (!(potentialQueryString.charAt(0) === '@') || this.queryString === '') {
      console.log(potentialQueryString);
      this.suggestionStore.setSuggestions(null);
    } else {
      const keyValue = potentialQueryString.replace('@', '').split(':');
      console.log(keyValue);
      let key = '';
      let value = '';
      if (keyValue.length === 2) {
        key = keyValue[0];
        value = keyValue[1];
      } else if (keyValue.length === 1) {
        value = keyValue[0];
      }
      console.log(key);
      console.log(value);
      this.osmService.getTagSuggestions(key, value).subscribe(suggestions => {
        this.suggestionStore.setSuggestions(suggestions);
      });
    }
    if (this.queryString.match(/@*/)) {

    }
  }

  streetsChanged() {
    this.itemStore.streets = !this.itemStore.streets;
    if (this.itemStore.streets) {
      this.refinementStore.addKeyRefinement({key: 'highway'});
    } else {
      this.refinementStore.setKeyValueRefinements([]);
    }
  }
}
