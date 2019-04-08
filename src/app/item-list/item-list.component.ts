import { Component, OnInit } from '@angular/core';
import {OscarItem} from '../models/oscar/oscar-item';
import {Observable} from 'rxjs';
import {OscarItemsService} from '../services/oscar/oscar-items.service';
import {ItemStoreService} from '../services/data/item-store.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  constructor(private itemStore: ItemStoreService) { }

  ngOnInit() {
  }

}
