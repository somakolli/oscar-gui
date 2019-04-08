import { Injectable } from '@angular/core';
declare var L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: L.Map;

  constructor() { }

  setView(lat: number, lng: number, zoom: number) {
    this.map.setView([lat, lng], zoom);
  }
}
