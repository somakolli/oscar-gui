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
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { ItemKvTableComponent } from './components/item-kv-table/item-kv-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SuggestionsComponent } from './components/side-bar/search/suggestions/suggestions.component';
import { SuggestionDetailComponent } from './components/side-bar/search/suggestions/suggestion-detail/suggestion-detail.component';
import { RefinementsComponent } from './components/side-bar/refinements/refinements.component';
import { RefinementDetailComponent } from './components/side-bar/refinements/refinement-detail/refinement-detail.component';
import {ThirdParyLinksComponent} from './components/third-pary-links/third-pary-links.component';
import { ActiveRefinementsComponent } from './components/side-bar/active-refinements/active-refinements.component';

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
    ItemInfoComponent,
    ItemKvTableComponent,
    LoadingComponent,
    SuggestionsComponent,
    SuggestionDetailComponent,
    RefinementsComponent,
    RefinementDetailComponent,
    ThirdParyLinksComponent,
    ActiveRefinementsComponent
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
