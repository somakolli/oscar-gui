import {Component, Input, OnInit} from '@angular/core';
import {OscarItem} from '../../../../../models/oscar/oscar-item';
import {ItemStoreService} from '../../../../../services/data/item-store.service';
import {MapService} from '../../../../../services/map/map.service';
import {OscarMinItem} from '../../../../../models/oscar/oscar-min-item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.sass']
})

export class ItemDetailComponent implements OnInit {
  @Input() oscarItem: OscarItem;
  @Input() parent: string;
  keyValues: object[] = [];
  constructor(private itemStore: ItemStoreService,
              private mapService: MapService) { }

  ngOnInit() {
     for (let i = 0; i < this.oscarItem.k.length; i++) {
       this.keyValues.push({k : this.oscarItem.k[i], v : this.oscarItem.v[i]});
       if (this.oscarItem.k[i] === 'name') {
         const name = this.oscarItem.v[i];
         if (name === '') {
           this.oscarItem.name = 'Item without name';
         } else {
           this.oscarItem.name = this.oscarItem.v[i];
         }
       }
     }
  }
  panTo() {
    this.mapService.setView(this.oscarItem.bbox[0], this.oscarItem.bbox[2], 18);
  }

}
