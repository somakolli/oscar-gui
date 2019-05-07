import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/side-bar/search/search.component';
import {FormsModule} from '@angular/forms';
import {OscarItemsService} from './services/oscar/oscar-items.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config/config.service';
import { ItemListComponent } from './components/side-bar/items/item-list/item-list.component';
import { ItemDetailComponent } from './components/side-bar/items/item-list/item-detail/item-detail.component';
import {ItemStoreService} from './services/data/item-store.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ItemsComponent } from './components/side-bar/items/items.component';
import { ItemDetailPipe } from './components/side-bar/items/item-list/item-detail/item-detail.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItemListComponent,
    ItemDetailComponent,
    MapComponent,
    SideBarComponent,
    ItemsComponent,
    ItemDetailPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    InfiniteScrollModule,
  ],
  providers: [OscarItemsService, ConfigService, ItemStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
