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
import {ColorTag} from '../../models/natural-language/color-tag';
import {DomSanitizer} from '@angular/platform-browser';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
declare function getOscarQuery(input);
declare function autoFillSuggestions(input);
declare function coloredInput(input);
import keyValueTags from '../../../assets/keyValueTags.json';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService, public searchService: SearchService,
              private osmService: OsmService, private suggestionStore: SuggestionsService, public refinementStore: RefinementsService,
              private sanitizer: DomSanitizer) { }
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
  eventCount = 0;
  suggestions = [];
  naturalPrefix = [];
  waitTime = 200;
  myControl = new FormControl();
  normalControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  normalSuggestions = [];
  oscarQuery = true;
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

  inputUpdate($event) {
    const splitString = $event.split(' ');
    const lastWord = splitString[splitString.length - 1];
    if (lastWord.charAt(0) === '@') {
      if (lastWord.charAt(lastWord.length - 1) === ' ') {
        this.normalSuggestions = [];
      } else {
        let i = 0;
        this.normalSuggestions = keyValueTags.filter((item => {
          if (i > 100) {
            return false;
          }
          const keyValueTag = item.k + ':' + item.v;
          const isMatch = keyValueTag.match(new RegExp(lastWord.slice(1), 'i'));
          if (isMatch) {
            ++i;
          }
          return isMatch;
        }));
      }
    } else {
      this.normalSuggestions = [];
    }
  }

  naturalUpdate($event) {
    this.naturalInput = $event;
    let colorOutputTags: ColorTag[];
    colorOutputTags = getOscarQuery(this.naturalInput);
    this.inputString = '';
    colorOutputTags.forEach(colorTag => {
      this.inputString += `${colorTag.tags} `;
    });
    this.eventCount++;
    setTimeout(() => this.showSuggestions(10, this.eventCount), 10);
  }
  showSuggestions(waitTime: number, eventId: number) {
    if (this.eventCount !== eventId) {
      return;
    }
    if (waitTime >= this.waitTime) {
      this.suggestions = autoFillSuggestions(this.naturalInput);
      return;
    }
    setTimeout(() => this.showSuggestions(waitTime + 10, eventId), 10);
  }

  selectEvent($event: any) {
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
        endNormalString = i + 1;
        break;
      }
    }
    return input.slice(0, endNormalString);
  }

  spanChange($event: Event) {
    console.log($event);
  }

  normalSelectEvent($event: MatAutocompleteSelectedEvent) {

  }

  radiusChange($event: number) {
    let radius = $event;
    if ($event === 1000) {
      radius = 100000;
    }
    this.itemStore.changeRadius(radius);
  }
  showRouting() {
    this.searchService.setShowRouting(true);
  }
}
