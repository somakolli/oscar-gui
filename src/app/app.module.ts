import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {FormsModule} from '@angular/forms';
import {OscarItemsService} from './services/oscar/oscar-items.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config/config.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-list/item-detail/item-detail.component';
import {ItemStoreService} from './services/data/item-store.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItemListComponent,
    ItemDetailComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot()
  ],
  providers: [OscarItemsService, ConfigService, ItemStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
