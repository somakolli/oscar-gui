
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import '../node_modules/leaflet-webgl-heatmap/dist/leaflet-webgl-heatmap.min';
import '../src/vendor/leaflet-vector-markers.min.js';

declare var L;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

console.log(L);

