import { Component, OnInit } from '@angular/core';
import {RefinementsService} from '../../../services/data/refinements.service';
import {KeyValueRefinement} from '../../../models/gui/refinement';

@Component({
  selector: 'app-active-refinements',
  templateUrl: './active-refinements.component.html',
  styleUrls: ['./active-refinements.component.sass']
})
export class ActiveRefinementsComponent implements OnInit {

  keyValueRefinements: KeyValueRefinement[];
  constructor(private refinementsService: RefinementsService) { }
  ngOnInit() {
    this.refinementsService.keyValueRefinements$.subscribe(keyValueRefinements => {
      this.keyValueRefinements = keyValueRefinements;
    });
    this.refinementsService.addKeyValueRefinement({key: 'amenity', value: 'restaurant', id: 0});
  }

}
