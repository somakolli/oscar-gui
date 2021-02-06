import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {OscarItemsService} from '../../services/oscar/oscar-items.service';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.sass']
})
export class AddressInputComponent implements OnInit {
  country: string;
  postcode: number;
  street: string;
  houseNumber: number;
  @Input()
  output: string;
  constructor(private oscarItemsService: OscarItemsService) { }
  ngOnInit(): void {
  }
  change() {
    const query = `@addr:street:${this.street} @addr:housenumber:${this.houseNumber} @addr:country:${this.country} @addr:postcode:${this.postcode}`;
    this.oscarItemsService.getItemsBinary(query).subscribe(data => console.log(data));
    console.log(query);
  }
}
