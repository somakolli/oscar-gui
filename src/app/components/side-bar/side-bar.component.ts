import {Component, OnInit} from '@angular/core';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchService} from '../../services/state/search.service';
import {SearchState} from '../../models/state/search-state.enum';
import {RefinementsService} from '../../services/data/refinements.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  constructor(public itemStore: ItemStoreService, public refinementsService: RefinementsService, public searchState: SearchService) { }
  routing = false;
  ngOnInit() {
    this.searchState.showRouting$.subscribe(
      visible => this.routing = visible
    );
  }

}
