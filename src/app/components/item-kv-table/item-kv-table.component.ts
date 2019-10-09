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
    this.lat = this.oscarItem.firstPoint.lat;
    this.lon = this.oscarItem.firstPoint.lon;
    this.keyValues.push({k: 'osm-id', v: this.oscarItem.properties.osmid});
    this.keyValues.push({k: 'oscar-id', v: this.oscarItem.properties.id});
    for (let i = 0; i < this.oscarItem.properties.k.length; i++) {
      this.keyValues.push({k : this.oscarItem.properties.k[i], v : this.oscarItem.properties.v[i]});
      if (this.oscarItem.properties.k[i] === 'name') {
        const name = this.oscarItem.properties.v[i];
        if (name === '') {
          this.oscarItem.properties.name = 'Item without name';
        } else {
          this.oscarItem.properties.name = this.oscarItem.properties.v[i];
        }
      }
    }
  }

}
