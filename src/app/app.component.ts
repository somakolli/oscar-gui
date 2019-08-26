import {Component, OnInit} from '@angular/core';
import {SearchService} from './services/state/search.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MapStateService} from './services/state/map-state.service';
import {RefinementsService} from './services/data/refinements.service';
import * as L from 'leaflet';

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
              private refinementService: RefinementsService) {
  }
  ngOnInit(): void {
    if (this.location.path() !== '') {
      const params = this.location.path().replace('/', '').replace('?', '').split('&');
      for (const param of params) {
        const keyValuePair = param.split('=');
        console.log(keyValuePair[0]);
        if (keyValuePair[0] === 'q') {
          this.searchService.setPartQueryString(keyValuePair[1]);
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
              this.refinementService.addKeyRefinement({id: 0, key: decodeURI(keyRefinementString)});
            }
          }
        }
        if (keyValuePair[0] === 'ek') {
          const keyRefinements = keyValuePair[1].split(',');
          for (const keyRefinementString of keyRefinements) {
            if (keyRefinementString !== '') {
              this.refinementService.addExKeyRefinement({id: 0, key: decodeURI(keyRefinementString)});
            }
          }
        }
        if (keyValuePair[0] === 'kv') {
          const keyValueRefinements = keyValuePair[1].split(',');
          for (const keyValueRefinementString of keyValueRefinements) {
            if (keyValueRefinementString !== '') {
              const refinementKeyValuePair = keyValueRefinementString.split(':');
              this.refinementService.addKeyValueRefinement(
                {id: 0, key: decodeURI(refinementKeyValuePair[0]), value: decodeURI(refinementKeyValuePair[1])}
                );
            }
          }
        }
        if (keyValuePair[0] === 'p') {
          const parentRefinements = keyValuePair[1].split(',');
          for (const parent of parentRefinements) {
            if (parent !== '') {
              this.refinementService.addParentRefinement(decodeURI(parent));
            }
          }
        }
      }
    }
    this.searchService.partQueryString$.subscribe(queryString => {
      this.query = queryString;
      this.changeUrl();
    });
    this.mapState.bounds$.subscribe(b => {
      this.changeUrl();
    });
    this.refinementService.keyRefinements$.subscribe(() => this.changeUrl());
    this.refinementService.exKeyRefinements$.subscribe(() => this.changeUrl());
    this.refinementService.keyValueRefinements$.subscribe(() => this.changeUrl());
    this.refinementService.exKeyValueRefinements$.subscribe(() => this.changeUrl());
    this.refinementService.parentRefinements$.subscribe(() => this.changeUrl());
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
    const parentRefinements = this.refinementService.getParentRefinements();
    for (const parentRefinement of parentRefinements) {
      parentRefinementsString += encodeURI(parentRefinement) + ',';
    }
    let keyRefinementsString = 'k=';
    const keyRefinements = this.refinementService.getKeyRefinements();
    for (const keyRefinement of keyRefinements) {
      keyRefinementsString += encodeURI(keyRefinement.key) + ',';
    }
    let exKeyRefinementsString = 'ek=';
    const exKeyRefinements = this.refinementService.getExKeyRefinements();
    for (const keyRefinement of exKeyRefinements) {
      exKeyRefinementsString += encodeURI(keyRefinement.key) + ',';
    }
    let keyValueRefinementsString = 'kv=';
    const keyValueRefinements = this.refinementService.getKeyValueRefinements();
    for (const keyValueRefinement of keyValueRefinements) {
      keyValueRefinementsString += encodeURI(keyValueRefinement.key) + ':' + keyValueRefinement.value + ',';
    }
    let exKeyValueRefinementsString = 'ekv=';
    const exKeyValueRefinements = this.refinementService.getExKeyValueRefinements();
    for (const keyValueRefinement of exKeyValueRefinements) {
      exKeyValueRefinementsString += encodeURI(keyValueRefinement.key) + ':' + keyValueRefinement.value + ',';
    }
    let urlString = `?q=${this.query}&b=${latLong.toBBoxString()}&${keyRefinementsString}&${exKeyRefinementsString}&${keyValueRefinementsString}&${exKeyValueRefinementsString}&${parentRefinementsString}`;
    this.location.go(urlString);
  }

}
