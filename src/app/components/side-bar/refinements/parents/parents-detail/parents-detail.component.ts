import {Component, Input, OnInit} from '@angular/core';
import {Parent} from '../../../../../models/oscar/refinements';
import {RefinementsService} from '../../../../../services/data/refinements.service';

@Component({
  selector: 'app-parents-detail',
  templateUrl: './parents-detail.component.html',
  styleUrls: ['./parents-detail.component.sass']
})
export class ParentsDetailComponent implements OnInit {
  @Input()
  parent: Parent;
  constructor(private refinementService: RefinementsService) { }

  ngOnInit() {

  }

  addRefinement(parent: Parent) {
    this.refinementService.addParentRefinement(parent.name);
  }
  addExRefinement(parent: Parent) {
    this.refinementService.addExParentRefinement(parent.name);
  }
}
