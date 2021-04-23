import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {MapService} from '../../services/map/map.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {GridService} from '../../services/data/grid.service';
import _ from 'lodash';
import {FacetRefinements, ParentRefinements} from '../../models/oscar/refinements';
import {SearchService} from '../../services/search/search.service';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

export const clearItems = new Subject<string>();
export const radiusSearchTrigger = new Subject<L.LatLng>();

@Component({
  selector: 'app-search-result-view',
  templateUrl: './search-result-view.component.html',
  styleUrls: ['./search-result-view.component.sass']
})
export class SearchResultViewComponent implements OnInit {

  constructor(private mapService: MapService,
              private oscarItemsService: OscarItemsService,
              private gridService: GridService,
              private zone: NgZone,
              private searchService: SearchService,
              private snackBar: MatSnackBar) {
  }

  items: OscarMinItem[] = [];
  currentItems: OscarMinItem[] = [];
  parentRefinements: ParentRefinements;
  facetRefinements: FacetRefinements;
  markerThreshHold = 40;
  heatmapSliderVisible = false;
  heatMapIntensity = 1;
  showGlobal = true;
  showLocal = false;
  showParents = false;
  showFacets = false;
  progress = 0;

  @Output()
  searchLoading = new EventEmitter<boolean>();
  @Output()
  noResult = new EventEmitter<boolean>();
  @Input()
  routesVisible = false;

  ngOnInit(): void {
    this.searchService.queryToDraw$.subscribe(async queryString => {
      await this.drawQuery(queryString);
    });
    this.mapService.onZoom$.subscribe((event) => {
      if (event !== null) {
        this.reDrawSearchMarkers();
      }
    });
    this.mapService.onMove$.subscribe((event) => {
      if (event !== null) {
        this.reDrawSearchMarkers();
      }
    });
    clearItems.asObservable().subscribe((value) => {
      if (value) {
        this.clearItems();
      }
    });
    this.mapService.onContextMenu$.subscribe(async (event) => {
      if (event){}
        // await this.searchRadius(event.latlng);
    });
    this.mapService._mapReady.subscribe((ready) => {
      if (!ready) {
        return;
      }
      console.log('ready');
      this.mapService._map.on('click', async (event: any) => {
        // await this.searchRadius(event.latlng);
      });
    });
    radiusSearchTrigger.asObservable().subscribe(async (latlng) => {
      if(!latlng)
        return;
      await this.searchRadius(latlng);
    });
  }

  private async searchRadius(sourceLatLng: L.LatLng) {
    let foundSomething = false;
    const maxRadius = 100;
    const increments = 10;
    for (let i = 1; i < maxRadius; i = i + increments) {
      const {query, items} = await this.oscarItemsService.getPoint(i, sourceLatLng.lat, sourceLatLng.lng);
      const binaryItems = await items.toPromise();
      const oscarMin = this.oscarItemsService.binaryItemsToOscarMin(binaryItems);
      if (oscarMin.length > 0) {
        console.log(binaryItems);
        await this.drawQuery(query);
        foundSomething = true;
        break;
      }
    }
    if(!foundSomething) {
      this.snackBar.open('Nothing found!', 'close', {
        duration: 2000
      });
    }
  }

  async drawQuery(queryString: string) {
    if (queryString) {
      this.noResult.emit(false);
      this.searchLoading.emit(true);
      this.clearItems();
      this.progress = 1;
      const itemsArray = await this.oscarItemsService.getItemsBinary(queryString).toPromise();
      this.heatmapSliderVisible = false;
      this.mapService.clearAllLayers();
      this.items = this.oscarItemsService.binaryItemsToOscarMin(itemsArray);
      console.log(queryString);
      if (this.items.length === 0 && queryString !== '() ') {
        this.noResult.emit(true);
        this.searchLoading.emit(false);
        return;
      } else {
        this.noResult.emit(false);
        this.searchLoading.emit(false);
      }
      this.gridService.buildGrid(this.items);
      this.reDrawSearchMarkers();
      this.mapService.fitBounds(this.gridService.getBBox());
      this.oscarItemsService.getParents(queryString, 0).subscribe(parents => {
        this.zone.run(() => this.parentRefinements = parents);
        this.progress += 25;
      });
      this.oscarItemsService.getFacets(queryString, 0).subscribe(facets => {
        this.zone.run(() => this.facetRefinements = facets);
        this.progress += 25;
      });
      this.searchLoading.emit(false);
    }
  }

  reDrawSearchMarkers() {
    this.mapService.clearSearchMarkers();
    this.mapService.clearHeatMap();
    const bounds = this.mapService.bounds;
    this.zone.run(() => {
      this.currentItems = this.gridService.getCurrentItems(bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast());
      this.progress += 25;
    });
    if (this.currentItems.length < this.markerThreshHold /*|| this.mapService.zoom === this.mapService.maxZoom*/) {
      this.heatmapSliderVisible = false;
      this.mapService.drawItemsMarker(this.currentItems);
    } else {
      this.heatmapSliderVisible = true;
      this.mapService.drawItemsHeatmap(_.sampleSize(this.currentItems, 100000), this.heatMapIntensity);
    }
    this.progress += 25;
  }

  intensityChange() {
    this.reDrawSearchMarkers();
  }

  globalClick($event: MouseEvent) {
    this.showLocal = false;
    this.showGlobal = !this.showGlobal;
    this.showParents = false;
    this.showFacets = false;
  }

  localClick($event: MouseEvent) {
    this.showLocal = !this.showLocal;
    this.showGlobal = false;
    this.showParents = false;
    this.showFacets = false;
  }

  parentClick($event: MouseEvent) {
    this.showLocal = false;
    this.showGlobal = false;
    this.showParents = !this.showParents;
    this.showFacets = false;
  }

  facetClick($event: MouseEvent) {
    this.showLocal = false;
    this.showGlobal = false;
    this.showParents = false;
    this.showFacets = !this.showFacets;
  }

  clearItems() {
    console.log('clearing heatmap');
    this.mapService.clearHeatMap();
    this.mapService.clearAllLayers();
    this.items = [];
    this.currentItems = [];
    this.parentRefinements = null;
    this.facetRefinements = null;
  }
}
