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
  get bounds() {
    return this.map.getBounds();
  }
  getPosition(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        console.log(resp);
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
      },
        err => {
          reject(err);
        });
    });
  }
}
