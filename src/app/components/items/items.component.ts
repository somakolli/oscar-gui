import {Component, OnInit} from '@angular/core';
import {ItemStoreService} from '../../services/data/item-store.service';
import {SearchService} from '../../services/state/search.service';
import {SearchState} from '../../models/state/search-state.enum';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  hidden = false;

  constructor(public itemStore: ItemStoreService, private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.newQuery$.subscribe(searchState => {
      if (searchState === SearchState.Pending) {
        this.hidden = true;
      } else if (searchState === SearchState.ToManyItems) {
        this.hidden = true;
      } else if (searchState === SearchState.Success) {
        this.hidden = false;
      }
    });
  }

}
