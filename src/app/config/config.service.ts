import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  getOscarUrl(): string {
    return 'https://oscar-web.de';
  }
  getRoutingUrl(): string {
    return 'https://virtserver.swaggerhub.com/somakolli/path_finder_api/1.0.0/routing';
  }
}
