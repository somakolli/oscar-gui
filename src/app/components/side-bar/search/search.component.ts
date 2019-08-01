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
  appendix = '';
  queryString = '@amenity:restaurant "Stuttgart"';
  keyPrependix = '';
  keyValuePrependix = '';
  parentPrependix = '';
  keyAppendix = '';
  keyValueAppendix = '';
  parentAppendix = '';
  ngOnInit() {
    this.suggestionStore.selectedSuggestion$.subscribe(suggestion => {
      if (suggestion) {
        const strings = this.queryString.split(' ');
        this.queryString = this.queryString.replace(strings[strings.length - 1], `@${suggestion.key}:${suggestion.value}`);
      }
    });
    this.refinementStore.keyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValuePrependix = '';
      keyValueRefinements.forEach(refinement => {
        this.keyValuePrependix += `@${refinement.key}:${refinement.value} `;
      });
    });
    this.refinementStore.keyRefinements$.subscribe(keyRefinements => {
      this.keyPrependix = '';
      keyRefinements.forEach(refinement => {
        this.keyValuePrependix += `@${refinement.key} `;
      });
    });
    this.refinementStore.parentRefinements$.subscribe(parentRefinements => {
      this.parentPrependix = '';
      parentRefinements.forEach(refinement => {
        this.parentPrependix += `"${refinement}" `;
      });
    });
    this.refinementStore.exKeyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValueAppendix = '';
      keyValueRefinements.forEach(refinement => {
        this.keyValueAppendix += `-@${refinement.key}:${refinement.value} `;
      });
    });
    this.refinementStore.exKeyRefinements$.subscribe(keyRefinements => {
      this.keyAppendix = '';
      keyRefinements.forEach(refinement => {
        this.keyAppendix += `-@${refinement.key} `;
      });
    });
    this.refinementStore.exParentRefinements$.subscribe(parentRefinements => {
      this.parentAppendix = '';
      parentRefinements.forEach(refinement => {
        this.parentAppendix += `-"${refinement}" `;
      });
    });
  }
  search(): void {
    const fullQueryString = this.keyPrependix + this.keyValuePrependix + this.parentPrependix
      + this.queryString + this.keyAppendix + this.parentAppendix + this.keyValueAppendix;
    this.searchService.setQuery(fullQueryString);
    this.searchService.setState(SearchState.Pending);
    this.itemStore.setHighlightedItem(null);
    this.oscarItemService.getApxItemCount(fullQueryString).subscribe(apxStats => {
      if (apxStats.items < 1000000) {
        this.oscarItemService.getItemsBinary(fullQueryString);
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
      this.suggestionStore.setSuggestions(null);
    } else {
      const keyValue = potentialQueryString.replace('@', '').split(':');
      let key = '';
      let value = '';
      if (keyValue.length === 2) {
        key = keyValue[0];
        value = keyValue[1];
      } else if (keyValue.length === 1) {
        value = keyValue[0];
      }
      this.osmService.getTagSuggestions(key, value).subscribe(suggestions => {
        this.suggestionStore.setSuggestions(suggestions);
      });
    }
  }

  streetsChanged() {
    this.itemStore.streets = !this.itemStore.streets;
    if (this.itemStore.streets) {
      this.refinementStore.addKeyRefinement({key: 'highway', id: 0});
    } else {
      this.refinementStore.hasKeyRefinement({key: 'highway', id: 0});
    }
  }
}
