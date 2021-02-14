import {Component, NgZone, OnInit} from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {MapService} from '../../services/map/map.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {GridService} from '../../services/data/grid.service';
import _ from 'lodash';
import {FacetRefinements, ParentRefinements} from '../../models/oscar/refinements';
import {SearchService} from '../../services/search/search.service';

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
              private searchService: SearchService) { }
  items: OscarMinItem[] = [];
  currentItems: OscarMinItem[] = [];
  parentRefinements: ParentRefinements;
  facetRefinements: FacetRefinements;
  markerThreshHold = 40;
  heatmapSliderVisible = false;
  heatMapIntensity = 1;
  showGlobal = false;
  showLocal = false;
  showParents = false;
  showFacets = false;
  progress = 0;
  ngOnInit(): void {
    this.searchService.queryToDraw$.subscribe(queryString => {
      if (queryString !== '') {
        this.progress = 1;
        this.oscarItemsService.getItemsBinary(queryString).subscribe(itemsArray => {
          this.heatmapSliderVisible = false;
          this.mapService.clearAllLayers();
          this.items = this.oscarItemsService.binaryItemsToOscarMin(itemsArray);
          this.gridService.buildGrid(this.items);
          this.reDrawSearchMarkers();
          this.mapService.fitBounds(this.gridService.getBBox());
        });
        this.oscarItemsService.getParents(queryString, 0).subscribe(parents => {
          this.zone.run(() => this.parentRefinements = parents);
          this.progress += 25;
        });
        this.oscarItemsService.getFacets(queryString, 0).subscribe(facets => {
          this.zone.run(() => this.facetRefinements = facets);
          this.progress += 25;
        });
      }
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
  }
  reDrawSearchMarkers() {
    this.mapService.clearSearchMarkers();
    this.mapService.clearHeatMap();
    const bounds = this.mapService.bounds;
    this.zone.run(() => {
      this.currentItems = this.gridService.getCurrentItems(bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast());
      this.progress += 25;
    });
    if (this.currentItems.length < this.markerThreshHold || this.mapService.zoom === this.mapService.maxZoom) {
      this.heatmapSliderVisible = false;
      this.mapService.drawItemsMarker(this.currentItems);
    } else {
      this.heatmapSliderVisible = true;
      this.mapService.drawItemsHeatmap(_.sampleSize(this.currentItems, 100000), this.heatMapIntensity);
    }
    this.progress += 25;
  }

  intensityChange() {
    console.log(this.heatMapIntensity);
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
}
