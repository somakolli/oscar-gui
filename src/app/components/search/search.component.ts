import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchState} from '../../models/state/search-state.enum';
import {OsmService} from '../../services/osm/osm.service';
import {SuggestionsService} from '../../services/data/suggestions.service';
import {RefinementsService} from '../../services/data/refinements.service';
import {RefinementType} from '../../models/gui/refinement';
import {FormControl} from '@angular/forms';
import {ColorTag} from '../../models/natural-language/color-tag';
import {DomSanitizer} from '@angular/platform-browser';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import keyValueTags from '../../../assets/keyValueTags.json';
import {RoutingService} from '../../services/routing/routing.service';
import {RoutingDataStoreService} from '../../services/data/routing-data-store.service';
import {SearchService} from '../../services/search/search.service';
import {Subject} from 'rxjs';
import {getActiveOffset} from '@angular/material/datepicker/multi-year-view';
import {MapService} from '../../services/map/map.service';

declare function getOscarQuery(input);

declare function autoFillSuggestions(input);

declare function coloredInput(input);

export const activateRouting = new Subject<boolean>();

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService,
              private osmService: OsmService, private suggestionStore: SuggestionsService, public refinementStore: RefinementsService,
              private sanitizer: DomSanitizer, private routingService: RoutingService, private routingDataStoreService: RoutingDataStoreService,
              private searchService: SearchService, private mapService: MapService) {
  }

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
  options: string[] = ['One', 'Two', 'Three'];
  normalSuggestions = [];
  oscarQuery = true;
  maxitems = 1000000;
  queryId = -1;
  @Output() routesVisibleEvent = new EventEmitter<boolean>();
  routesVisible = false;
  sideButtonClass = 'side-button';
  localSearch = true;
  preferences = false;

  ngOnInit() {
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
    activateRouting.subscribe(() => this.showRouting());
  }

  search(): void {
    let idPrependix = '(';
    if (this.routingService.currentRoute) {
      let first = true;
      for (const cellId of this.routingService.currentRoute.cellIds) {
        if (!first) {
          idPrependix += ' + ';
        }
        first = false;
        idPrependix += '$cell:' + cellId;
      }
    }
    this.queryId++;

    const routeQueryString = this.getRouteQueryString();

    let fullQueryString = idPrependix + ') ' + this.keyPrependix + this.keyValuePrependix + this.parentPrependix
      + this.inputString + this.keyAppendix + this.parentAppendix + this.keyValueAppendix + routeQueryString;

    if (fullQueryString === '') {
      return;
    }
    if (this.localSearch && this.mapService.ready) {
      const bounds = this.mapService.bounds;
      fullQueryString = fullQueryString + ` $geo:${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
    }
    this.itemStore.setHighlightedItem(null);
    this.oscarItemService.getApxItemCount(fullQueryString).subscribe(apxStats => {
      if (apxStats.items < this.maxitems) {
        this.searchService.queryToDraw.next(fullQueryString);
      } else {
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

  toggleRouting() {
    this.routesVisibleEvent.emit(!this.routesVisible);
    this.routesVisible = !this.routesVisible;
    this.sideButtonClass = this.routesVisible ? 'side-button-active' : 'side-button';
  }

  showRouting() {
    if (!this.routesVisible) {
      this.toggleRouting();
    }
  }

  private getRouteQueryString(): string {
    let returnString = '';
    const routes = this.routingDataStoreService.routesToAdd.values();
    if (!routes) {
      return returnString;
    }
    for (const points of this.routingDataStoreService.routesToAdd.values()) {
      returnString += ' $route(0,0';
      for (const point of points) {
        returnString += `,${point.lat},${point.lon}`;
      }
      returnString += ')';
    }
    return returnString;
  }

  togglePreferences() {
    this.preferences = !this.preferences;
  }
}
