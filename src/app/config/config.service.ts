import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  getOscarUrl(): string {
    return 'https://www.oscar-web.de';
  }
}
