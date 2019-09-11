import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchService} from '../../services/state/search.service';
import {InitState, SearchState} from '../../models/state/search-state.enum';
import {OsmService} from '../../services/osm/osm.service';
import {SuggestionsService} from '../../services/data/suggestions.service';
import {RefinementsService} from '../../services/data/refinements.service';
import {RefinementType} from '../../models/gui/refinement';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService, public searchService: SearchService,
              private osmService: OsmService, private suggestionStore: SuggestionsService, public refinementStore: RefinementsService) { }
  error = false;
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
    this.searchService.initState$.subscribe(state => {
      console.log(state);
      if (state === InitState.LoadedRefinements) {
        this.search();
      }
    });
    this.searchService.inputQueryString$.subscribe(queryString => {
      this.inputString = decodeURI(queryString);
      if (queryString !== '' && this.first) {
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
    this.refinementStore.refinements$.subscribe(refinements => {
      this.keyValuePrependix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.KeyValue && refinement.excluding === false)
        .forEach(refinement => {
          this.keyValuePrependix += `@${refinement.key}:${refinement.value} `;
        });
      this.keyPrependix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.Key && refinement.excluding === false)
        .forEach(refinement => {
          this.keyValuePrependix += `@${refinement.key} `;
        });
      this.parentPrependix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.Parent && refinement.excluding === false)
        .forEach(refinement => {
          this.parentPrependix += `"${refinement.value}" `;
        });
      this.keyValueAppendix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.KeyValue && refinement.excluding === true)
        .forEach(refinement => {
          this.keyValueAppendix += `-@${refinement.key}:${refinement.value} `;
        });
      this.keyAppendix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.Key && refinement.excluding === true)
        .forEach(refinement => {
          this.keyAppendix += `-@${refinement.key} `;
        });
      this.parentAppendix = '';
      refinements.filter(refinement => refinement.refinementType === RefinementType.Parent && refinement.excluding === true)
        .forEach(refinement => {
          this.parentAppendix += `-"${refinement}" `;
        });
      this.search();
    });
  }
  search(): void {
    if (this.searchService.getInitState() === InitState.SetQuery) {
      return;
    }
    this.searchService.queryId++;
    const fullQueryString = this.keyPrependix + this.keyValuePrependix + this.parentPrependix
      + this.inputString + this.keyAppendix + this.parentAppendix + this.keyValueAppendix;
    if (fullQueryString === '') {
      this.searchService.setState(SearchState.NoQuery);
      return;
    }
    this.searchService.setInputQueryString(this.inputString);
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
    }
  }
}
