import { Component, OnInit } from '@angular/core';
import {ItemStoreService} from '../../services/data/item-store.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  constructor(public itemStore: ItemStoreService) { }

  ngOnInit() {
  }

}
