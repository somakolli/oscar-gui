import {Component, Input, NgZone, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Subject} from 'rxjs';
import {GeoPoint} from '../../models/geo-point';
import {activateRouting} from '../search/search.component';

export let routesEmpty = true;
export const addRoutingPointEvent = new Subject<{point: GeoPoint, name: string}>();
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.sass']
})
export class RoutesComponent implements OnInit {
  @Input()
  routesVisible = false;
  constructor(private zone: NgZone) { }
  routes: {active: boolean, name: string, color: string; destroyed: boolean; initialPoint: {point: GeoPoint, name: string}}[] = [];
  ngOnInit(): void {
    addRoutingPointEvent.subscribe(point => {
      if (routesEmpty) {
        activateRouting.next(true);
        this.addTab(point);
      }
    });
  }

  addTab(initialPoint = null) {
    this.routes.push({active: false, name: 'route', color: this.getRandomColor(), destroyed: false, initialPoint});
    routesEmpty = false;
  }

  changeTab($event: MatTabChangeEvent) {
    if (this.routes.length === 0){
      return;
    }
    for (const route of this.routes) {
      route.active = false;
    }
    this.routes[$event.index].active = true;
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  closeTab(route: { active: boolean; name: string; color: string; destroyed: boolean }) {
    this.zone.run(() =>
      this.routes.find(value => value.color === route.color).destroyed = true
    );
    this.routes = this.routes.filter((value) => value.color !== route.color);
    routesEmpty = this.routes.length === 0;
  }
}
