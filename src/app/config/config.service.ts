import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  getOscarUrl(): string {
    return 'https://routing.oscar-web.de';
    // return 'http://localhost';
  }
  getRoutingUrl(): string {
    return 'https://routing.oscar-web.de/oscar/routing/route';
  }
}
