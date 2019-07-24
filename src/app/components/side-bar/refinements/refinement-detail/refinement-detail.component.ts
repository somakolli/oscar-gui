import {Component, Input, OnInit} from '@angular/core';
import {Facet} from '../../../../models/oscar/refinements';

@Component({
  selector: 'app-refinement-detail',
  templateUrl: './refinement-detail.component.html',
  styleUrls: ['./refinement-detail.component.sass']
})
export class RefinementDetailComponent implements OnInit {

  constructor() { }
  @Input()
  facet: Facet;
  ngOnInit() {
  }

}
