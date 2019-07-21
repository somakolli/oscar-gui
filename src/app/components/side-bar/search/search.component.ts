import {Component, OnInit} from '@angular/core';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';
import {ItemStoreService} from '../../../services/data/item-store.service';
import {SearchService} from '../../../services/state/search.service';
import {SearchState} from '../../../models/state/search-state.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService, public itemStore: ItemStoreService, public searchService: SearchService) { }
  error = false;

  queryString = '@amenity:restaurant "Stuttgart"';
  ngOnInit() {
  }
  search(): void {
    this.searchService.setState(SearchState.Pending);
    this.itemStore.setHighlightedItem(null);
    this.oscarItemService.getApxItemCount(this.queryString).subscribe(apxStats => {
      if (apxStats.items < 1000000) {
        this.oscarItemService.getItemsBinary(this.queryString);
        this.searchService.setState(SearchState.Success);
        this.error = false;
      } else {
        this.searchService.setState(SearchState.ToManyItems);
        this.error = true;
      }
    });
  }
}
