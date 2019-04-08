import { Component, OnInit } from '@angular/core';
import {OscarItemsService} from '../services/oscar/oscar-items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService) { }

  queryString = '@amenity:restaurant "Sindelfingen"';
  ngOnInit() {
  }
  search(): void {
    this.oscarItemService.getItems(this.queryString);
  }
}
