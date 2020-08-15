import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  getOscarUrl(): string {
    return 'https://oscar-web.de';
    // return 'http://localhost';
  }
  getRoutingUrl(): string {
    return 'http://localhost/oscar/routing/route';
  }
}
