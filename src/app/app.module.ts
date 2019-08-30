import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule} from '@angular/forms';
import {OscarItemsService} from './services/oscar/oscar-items.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config/config.service';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { ItemDetailComponent } from './components/items/item-list/item-detail/item-detail.component';
import {ItemStoreService} from './services/data/item-store.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailPipe } from './components/items/item-list/item-detail/item-detail.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { ItemKvTableComponent } from './components/item-kv-table/item-kv-table.component';
import { SuggestionsComponent } from './components/search/suggestions/suggestions.component';
import { SuggestionDetailComponent } from './components/search/suggestions/suggestion-detail/suggestion-detail.component';
import { RefinementsComponent } from './components/refinements/refinements.component';
import { RefinementDetailComponent } from './components/refinements/refinement-detail/refinement-detail.component';
import { ActiveRefinementsComponent } from './components/active-refinements/active-refinements.component';
import { FacetsComponent } from './components/refinements/facets/facets.component';
import { FacetsDetailComponent } from './components/refinements/facets/facets-detail/facets-detail.component';
import { ParentsComponent } from './components/refinements/parents/parents.component';
import { ParentsDetailComponent } from './components/refinements/parents/parents-detail/parents-detail.component';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    SuggestionsComponent,
    SuggestionDetailComponent,
    RefinementsComponent,
    RefinementDetailComponent,
    ActiveRefinementsComponent,
    FacetsComponent,
    FacetsDetailComponent,
    ParentsComponent,
    ParentsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    InfiniteScrollModule,
    RouterModule,
    DragDropModule
  ],
  providers: [OscarItemsService, ConfigService, ItemStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
