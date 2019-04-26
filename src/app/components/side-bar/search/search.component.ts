import { Component, OnInit } from '@angular/core';
import {OscarItemsService} from '../../../services/oscar/oscar-items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  constructor(private oscarItemService: OscarItemsService) { }
  error = false;

  queryString = '@amenity:restaurant "Stuttgart"';
  ngOnInit() {
  }
  search(): void {
    let apxItemCount = 1000;
    //this.oscarItemService.getApxItemCount(this.queryString).subscribe(apxItemCount => {
    if (apxItemCount < 10000) {
        this.oscarItemService.getItemsBinary(this.queryString);
      } else {
        this.error = true;
    }
    //});
    // this.oscarItemService.getLocalItems(this.queryString);
  }
}
