import {Component, Input, OnInit} from '@angular/core';
import {OscarItem} from '../../models/oscar/oscar-item';

@Component({
  selector: 'app-item-kv-table',
  templateUrl: './item-kv-table.component.html',
  styleUrls: ['./item-kv-table.component.sass']
})
export class ItemKvTableComponent implements OnInit {
  @Input() oscarItem: OscarItem;
  keyValues: object[] = [];
  constructor() { }
  lat: number;
  lon: number;
  ngOnInit() {
    this.lat = this.oscarItem.bbox[2];
    this.lon = this.oscarItem.bbox[0];
    this.keyValues.push({k: 'osm-id', v: this.oscarItem.osmid});
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

}
