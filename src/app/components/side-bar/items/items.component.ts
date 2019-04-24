import { Component, OnInit } from '@angular/core';
import {ItemStoreService} from '../../../services/data/item-store.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {

  constructor(private itemStore: ItemStoreService) { }

  ngOnInit() {
  }

}
