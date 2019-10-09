import {Component, OnInit} from '@angular/core';
import {SearchService} from './services/state/search.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {MapStateService} from './services/state/map-state.service';
import {RefinementsService} from './services/data/refinements.service';
import * as L from 'leaflet';
import {MapService} from './services/map/map.service';
import {InitState} from './models/state/search-state.enum';
import {RefinementType} from './models/gui/refinement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})

export class AppComponent implements OnInit {
  title = 'oscar-gui';
  query = '';
  constructor(private searchService: SearchService, private location: Location, private mapState: MapStateService,
              private refinementService: RefinementsService, private mapService: MapService) {
  }
  ngOnInit(): void {
    if (this.location.path() !== '' && this.location.path() !== '/') {
      const params = this.location.path().replace('/', '').replace('?', '').split('&');
      console.log(params);
      for (const param of params) {
        const keyValuePair = param.split('=');
        if (keyValuePair[0] === 'q') {
          this.searchService.setInputQueryString(keyValuePair[1]);
        }
        if (keyValuePair[0] === 'b') {
          const bounds = keyValuePair[1].split(',');
          const southWest = L.latLng(parseFloat(bounds[1]), parseFloat(bounds[0]));
          const northEast = L.latLng(parseFloat(bounds[3]), parseFloat(bounds[2]));
          this.searchService.setBoundingBox(L.latLngBounds(northEast, southWest));
        }
        if (keyValuePair[0] === 'k') {
          const keyRefinements = keyValuePair[1].split(',');
          for (const keyRefinementString of keyRefinements) {
            if (keyRefinementString !== '') {
              this.refinementService.addRefinement(
                {id: 0, key: decodeURIComponent(keyRefinementString), value: '', refinementType: RefinementType.Key, excluding: false}
              );
            }
          }
        }
        if (keyValuePair[0] === 'ek') {
          const keyRefinements = keyValuePair[1].split(',');
          for (const keyRefinementString of keyRefinements) {
            if (keyRefinementString !== '') {
              this.refinementService.addRefinement({id: 0, key: decodeURIComponent(keyRefinementString), value: '', refinementType: RefinementType.Key, excluding: true});
            }
          }
        }
        if (keyValuePair[0] === 'kv') {
          const keyValueRefinements = keyValuePair[1].split(',');
          for (const keyValueRefinementString of keyValueRefinements) {
            if (keyValueRefinementString !== '') {
              const refinementKeyValuePair = keyValueRefinementString.split(':');
              this.refinementService.addRefinement(
                {id: 0, key: decodeURIComponent(refinementKeyValuePair[0]), value: decodeURIComponent(refinementKeyValuePair[1]), refinementType: RefinementType.KeyValue, excluding: false}
              );
            }
          }
        }
        if (keyValuePair[0] === 'p') {
          const parentRefinements = keyValuePair[1].split(',');
          for (const parent of parentRefinements) {
            if (parent !== '') {
              this.refinementService.addRefinement({id: 0, value: decodeURIComponent(parent), key: '', refinementType: RefinementType.Parent, excluding: false});
            }
          }
        }
        if (keyValuePair[0] === 'ep') {
          const parentRefinements = keyValuePair[1].split(',');
          for (const parent of parentRefinements) {
            if (parent !== '') {
              this.refinementService.addRefinement({id: 0, value: decodeURIComponent(parent), key: '', refinementType: RefinementType.Parent, excluding: true});
            }
          }
        }
      }
      this.searchService.setInitState(InitState.LoadedRefinements);
    } else {
      this.searchService.setInitState(InitState.InitFinished);
    }
    this.searchService.inputQueryString$.subscribe(queryString => {
      this.query = queryString;
      this.changeUrl();
    });
    this.mapState.bounds$.subscribe(b => {
      this.changeUrl();
    });
    this.refinementService.refinements$.subscribe(() => this.changeUrl());
  }

  changeUrl() {
    const latLong = this.mapState.getBounds();
    if (!latLong) {
      return;
    }
    if (this.query === '') {
      return;
    }
    let parentRefinementsString = 'p=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.Parent && refinement.excluding === false)
      .forEach(parentRefinement => parentRefinementsString += encodeURIComponent(parentRefinement.value) + ',');
    let exParentRefinementsString = 'ep=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.Parent && refinement.excluding === true)
      .forEach(parentRefinement => exParentRefinementsString += encodeURIComponent(parentRefinement.value) + ',');
    let keyRefinementsString = 'k=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.Key && refinement.excluding === false)
      .forEach(keyRefinement => keyRefinementsString += encodeURIComponent(keyRefinement.key) + ',');
    let exKeyRefinementsString = 'ek=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.Key && refinement.excluding === true)
      .forEach(exKeyRefinement => exKeyRefinementsString += encodeURIComponent(exKeyRefinement.key) + ',');
    let keyValueRefinementsString = 'kv=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.KeyValue && refinement.excluding === false)
      .forEach(keyValueRefinement => keyValueRefinementsString += encodeURIComponent(keyValueRefinement.key) + ':' + keyValueRefinement.value + ',');
    let exKeyValueRefinementsString = 'ekv=';
    this.refinementService.getRefinements()
      .filter(refinement => refinement.refinementType === RefinementType.KeyValue && refinement.excluding === true)
      .forEach(
        exKeyValueRefinement => exKeyValueRefinementsString += encodeURIComponent(exKeyValueRefinement.key) + ':' + exKeyValueRefinement.value + ','
      );
    let urlString = `?q=${encodeURIComponent(this.query)}&b=${latLong.toBBoxString()}&${keyRefinementsString}&${exKeyRefinementsString}&${keyValueRefinementsString}&${exKeyValueRefinementsString}&${parentRefinementsString}&${exParentRefinementsString}`;
    this.location.go(urlString);
  }

}
