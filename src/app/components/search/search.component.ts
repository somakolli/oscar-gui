import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchService} from '../../services/state/search.service';
import {InitState, SearchState} from '../../models/state/search-state.enum';
import {OsmService} from '../../services/osm/osm.service';
import {SuggestionsService} from '../../services/data/suggestions.service';
import {RefinementsService} from '../../services/data/refinements.service';
import {RefinementType} from '../../models/gui/refinement';
import {FormControl} from '@angular/forms';
declare function getOscarQuery(input);
declare function autoFillSuggestions(input);
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
  naturalInput = '';
  suggestions = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit() {
    this.searchService.initState$.subscribe(state => {
      console.log(state);
      if (state === InitState.LoadedRefinements) {
        this.search();
      }
    });
    this.searchService.inputQueryString$.subscribe(queryString => {
      this.inputString = decodeURIComponent(queryString);
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
    console.log('translated query', getOscarQuery(this.inputString));
    console.log('suggestions query', autoFillSuggestions(this.inputString));
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
    console.log(getOscarQuery(this.naturalInput));
    console.log(autoFillSuggestions(this.naturalInput));
  }

  naturalUpdate($event) {
    this.naturalInput = $event;
    console.log('naturalInput', this.naturalInput);
    this.inputString = getOscarQuery(this.naturalInput);
    this.suggestions = autoFillSuggestions(this.naturalInput);
    console.log(this.suggestions);
  }

  selectEvent($event: any) {
    console.log($event);
    const splitValues = this.naturalInput.split(' ');
    this.naturalInput.replace(splitValues[splitValues.length - 1], $event);
  }

  onFocused($event: void) {

  }

  inputWithoutLastWord(input: string) {
    const charArray = [...input];
    let endNormalString = 0;
    for (let i = charArray.length - 1; i >= 0; i--) {
      if (charArray[i] === ' ') {
        endNormalString = i;
        break;
      }
    }
    return input.slice(0, endNormalString);
  }
}
