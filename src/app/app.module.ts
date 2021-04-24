import {MatProgressBarModule} from '@angular/material/progress-bar';

declare var L;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OscarItemsService} from './services/oscar/oscar-items.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config/config.service';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import {ItemStoreService} from './services/data/item-store.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ItemDetailPipe } from './components/item-detail/item-detail.pipe';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import { ItemKvTableComponent } from './components/item-kv-table/item-kv-table.component';
import { SuggestionsComponent } from './components/search/suggestions/suggestions.component';
import { SuggestionDetailComponent } from './components/search/suggestions/suggestion-detail/suggestion-detail.component';
import { RefinementsComponent } from './components/refinements/refinements.component';
import { ActiveRefinementsComponent } from './components/active-refinements/active-refinements.component';
import { FacetsComponent } from './components/refinements/facets/facets.component';
import { FacetsDetailComponent } from './components/refinements/facets/facets-detail/facets-detail.component';
import { ParentsComponent } from './components/refinements/parents/parents.component';
import { ParentsDetailComponent } from './components/refinements/parents/parents-detail/parents-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { KeepHtmlPipe } from './components/search/keep-html.pipe';
import {MatSliderModule} from '@angular/material/slider';
import { SearchResultViewComponent } from './components/search-result-view/search-result-view.component';
import { ItemCountComponent } from './components/item-count/item-count.component';
import { NewItemListComponent } from './components/new-item-list/new-item-list.component';
import { HumanReadableNumbersPipePipe } from './pipes/human-readable-numbers-pipe.pipe';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { RoutingProgressBarComponent } from './components/routing-progress-bar/routing-progress-bar.component';
import { RoutesComponent } from './components/routes/routes.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RegionComponent } from './components/region/region.component';
import {MatMenuModule} from '@angular/material/menu';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItemDetailComponent,
    MapComponent,
    SideBarComponent,
    ItemDetailPipe,
    ItemInfoComponent,
    ItemKvTableComponent,
    SuggestionsComponent,
    SuggestionDetailComponent,
    RefinementsComponent,
    ActiveRefinementsComponent,
    FacetsComponent,
    FacetsDetailComponent,
    ParentsComponent,
    ParentsDetailComponent,
    KeepHtmlPipe,
    SearchResultViewComponent,
    ItemCountComponent,
    NewItemListComponent,
    HumanReadableNumbersPipePipe,
    AddressInputComponent,
    RoutingProgressBarComponent,
    RoutesComponent,
    RegionComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        LeafletModule.forRoot(),
        BrowserAnimationsModule,
        InfiniteScrollModule,
        DragDropModule,
        ReactiveFormsModule,
        OverlayModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSliderModule,
        MatTabsModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatMenuModule,
        ClipboardModule,
        MatSnackBarModule,
        NgxSkeletonLoaderModule
    ],
  providers: [OscarItemsService, ConfigService, ItemStoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
