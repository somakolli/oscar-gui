import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../services/data/item-store.service';
import {OsmService} from '../../services/osm/osm.service';
import {SuggestionsService} from '../../services/data/suggestions.service';
import {RefinementsService} from '../../services/data/refinements.service';
import {RefinementType} from '../../models/gui/refinement';
import {FormControl} from '@angular/forms';
import {ColorTag} from '../../models/natural-language/color-tag';
import {DomSanitizer} from '@angular/platform-browser';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import keyValueTags from '../../../assets/keyValueTags.json';
import {RoutingService, RoutingType} from '../../services/routing/routing.service';
import {RoutingDataStoreService} from '../../services/data/routing-data-store.service';
import {SearchService} from '../../services/search/search.service';
import {Subject} from 'rxjs';
import {MapService} from '../../services/map/map.service';
import {WikiServiceService} from '../../services/wikipedia/wiki-service.service';
import {OscarItem} from '../../models/oscar/oscar-item';
import {displayRegion} from '../region/region.component';
import {clearItems} from '../search-result-view/search-result-view.component';

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
              private osmService: OsmService, private suggestionStore: SuggestionsService,
              public refinementStore: RefinementsService,
              private sanitizer: DomSanitizer, private routingService: RoutingService,
              private routingDataStoreService: RoutingDataStoreService,
              private searchService: SearchService, private mapService: MapService,
              private zone: NgZone,
              private wikiService: WikiServiceService) {
  }
  @Input()
  loading = false;

  @Input()
  noResult = false;
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
  localSearch = false;
  preferences = false;
  @Output() impressumVisibleEvent = new EventEmitter<boolean>();
  impressumVisible = false;

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

  async search() {
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
      const localString = fullQueryString + ` $geo:${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      const apxStats = await this.oscarItemService.getApxItemCount(localString).toPromise();
      if (apxStats.items > 0) {
        fullQueryString = localString;
      }
    }
    this.itemStore.setHighlightedItem(null);
    this.loading = true;
    this.oscarItemService.getRegion(fullQueryString).subscribe(async regions => {
      displayRegion.next(null);
      if (regions && regions.length > 0) {
        // get region with most items
        clearItems.next('clear');
        this.mapService.drawRegion(regions[0]);
        const region = regions[0];
        displayRegion.next(OscarItem.getValue(region, 'wikidata'));
        this.loading = false;
        this.error = false;
      } else {
        displayRegion.next(null);
        this.mapService.clearRegions();
        this.oscarItemService.getApxItemCount(fullQueryString).subscribe(apxStats => {
          if (apxStats.items < this.maxitems) {
            this.searchService.queryToDraw.next(fullQueryString);
          } else {
            this.error = true;
            this.loading = false;
          }
        });
      }
    });
  }

  searchPoint(point: L.LatLng) {
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
    const routes =  [];
    for (const route of this.routingDataStoreService.routesToAdd.values()) {
      routes.push(route);
    }
    if (!routes) {
      return returnString;
    }
    for (const route of routes) {
      let routingTypeIndicator = 0;
      switch (route.routingType) {
        case RoutingType.Car:
          routingTypeIndicator = 0;
          break;
        case RoutingType.Bike:
          routingTypeIndicator = 1;
          break;
        case  RoutingType.Foot:
          routingTypeIndicator = 2;
          break;
      }
      returnString += ' $route(0,' + routingTypeIndicator;
      for (const point of route.geoPoints) {
        returnString += `,${point.lat},${point.lon}`;
      }
      returnString += ')';
    }
    return returnString;
  }

  togglePreferences() {
    this.preferences = !this.preferences;
  }
  toggleImpressum() {
    this.impressumVisibleEvent.emit(!this.impressumVisible);
    this.impressumVisible = !this.impressumVisible;
  }
}
