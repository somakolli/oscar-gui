import {Component, NgZone, OnInit} from '@angular/core';
import {OscarMinItem} from '../../models/oscar/oscar-min-item';
import {SearchService} from '../../services/state/search.service';
import {MapService} from '../../services/map/map.service';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';
import {GridService} from '../../services/data/grid.service';

@Component({
  selector: 'app-search-result-view',
  templateUrl: './search-result-view.component.html',
  styleUrls: ['./search-result-view.component.sass']
})
export class SearchResultViewComponent implements OnInit {

  constructor(private searchService: SearchService,
              private mapService: MapService,
              private oscarItemsService: OscarItemsService,
              private gridService: GridService,
              private zone: NgZone) { }
  items: OscarMinItem[] = [];
  currentItems: OscarMinItem[] = [];
  markerThreshHold = 300;
  ngOnInit(): void {
    this.searchService.queryString$.subscribe(queryString => {
      if (queryString !== '') {
        this.oscarItemsService.getItemsBinary(queryString).subscribe(itemsArray => {
          this.mapService.clearAllLayers();
          this.items = this.oscarItemsService.binaryItemsToOscarMin(itemsArray);
          this.gridService.buildGrid(this.items);
          this.reDrawSearchMarkers();
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
    const bounds = this.mapService.bounds;
    this.zone.run(() => this.currentItems = this.gridService.getCurrentItems(bounds.getSouth(),
      bounds.getWest(), bounds.getNorth(), bounds.getEast()));
    if (this.currentItems.length < this.markerThreshHold) {
      this.mapService.drawItemsMarker(this.currentItems);
    } else {
      this.mapService.drawItemsHeatmap(this.currentItems);
    }
  }

}
