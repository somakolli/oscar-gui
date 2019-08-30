import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchService} from '../../services/state/search.service';
import {SearchState} from '../../models/state/search-state.enum';
import {OsmService} from '../../services/osm/osm.service';
import {SuggestionsService} from '../../services/data/suggestions.service';
import {RefinementsService} from '../../services/data/refinements.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService, public searchService: SearchService,
              private osmService: OsmService, private suggestionStore: SuggestionsService, public refinementStore: RefinementsService) { }
  error = false;
  appendix = '';
  inputString = '';
  queryString = '';
  keyPrependix = '';
  keyValuePrependix = '';
  parentPrependix = '';
  keyAppendix = '';
  keyValueAppendix = '';
  parentAppendix = '';
  first = true;
  ngOnInit() {
    this.searchService.inputQueryString$.subscribe(queryString => {
      this.inputString = decodeURI(queryString);
      if (queryString !== '' && this.first ) {
        this.first = false;
        this.search();
      }
    });
    this.searchService.newQuery$.subscribe(state => {
      if (state === SearchState.ToManyItems)  {
        this.error = true;
      } else if (state === SearchState.Success) {
        this.error = false;
      } else if (state === SearchState.DrawingComplete) {
        this.error = false;
      }
    });
    this.refinementStore.keyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValuePrependix = '';
      if (keyValueRefinements.length === 0) {
        return;
      }
      keyValueRefinements.forEach(refinement => {
        this.keyValuePrependix += `@${refinement.key}:${refinement.value} `;
      });
      this.search();
    });
    this.refinementStore.keyRefinements$.subscribe(keyRefinements => {
      this.keyPrependix = '';
      if (keyRefinements.length === 0) {
        return;
      }
      keyRefinements.forEach(refinement => {
        this.keyValuePrependix += `@${refinement.key} `;
      });
      this.search();
    });
    this.refinementStore.parentRefinements$.subscribe(parentRefinements => {
      this.parentPrependix = '';
      if (parentRefinements.length === 0) {
        return;
      }
      parentRefinements.forEach(refinement => {
        this.parentPrependix += `"${refinement}" `;
      });
      this.search();
    });
    this.refinementStore.exKeyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValueAppendix = '';
      if (keyValueRefinements.length === 0) {
        return;
      }
      keyValueRefinements.forEach(refinement => {
        this.keyValueAppendix += `-@${refinement.key}:${refinement.value} `;
      });
      this.search();
    });
    this.refinementStore.exKeyRefinements$.subscribe(keyRefinements => {
      this.keyAppendix = '';
      if (keyRefinements.length === 0) {
        return;
      }
      keyRefinements.forEach(refinement => {
        this.keyAppendix += `-@${refinement.key} `;
      });
      this.search();
    });
    this.refinementStore.exParentRefinements$.subscribe(parentRefinements => {
      this.parentAppendix = '';
      if (parentRefinements.length === 0) {
        return;
      }
      parentRefinements.forEach(refinement => {
        this.parentAppendix += `-"${refinement}" `;
      });
      this.search();
    });
  }
  search(): void {
    this.searchService.queryId++;
    this.searchService.setInputQueryString(this.inputString);
    const fullQueryString = this.keyPrependix + this.keyValuePrependix + this.parentPrependix
      + this.inputString + this.keyAppendix + this.parentAppendix + this.keyValueAppendix;
    if (fullQueryString === '') {
      this.searchService.setState(SearchState.NoQuery);
      return;
    }
    this.searchService.setQuery(fullQueryString);
    this.searchService.setState(SearchState.Pending);
    this.itemStore.setHighlightedItem(null);
    this.oscarItemService.getApxItemCount(fullQueryString).subscribe(apxStats => {
      if (apxStats.items < 1000000) {
        this.oscarItemService.getItemsBinary(fullQueryString);
        this.searchService.setState(SearchState.Success);
      } else {
        this.searchService.setState(SearchState.ToManyItems);
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
      // this.osmService.getTagSuggestions(key, value).subscribe(suggestions => {
      //  this.suggestionStore.setSuggestions(suggestions);
      // });
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
