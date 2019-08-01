import {Component, Input, OnInit} from '@angular/core';
import {Facet, FacetValues} from '../../../../../models/oscar/refinements';
import {RefinementsService} from '../../../../../services/data/refinements.service';

@Component({
  selector: 'app-facets-detail',
  templateUrl: './facets-detail.component.html',
  styleUrls: ['./facets-detail.component.sass']
})
export class FacetsDetailComponent implements OnInit {

  constructor(private refinementService: RefinementsService) { }
  @Input()
  facet: Facet;
  ngOnInit() {
  }

  addKeyRefinement() {
    this.refinementService.addKeyRefinement({key: this.facet.key, id: this.facet.keyId});
  }

  addkeyValueRefinement(value: FacetValues) {
    this.refinementService.addKeyValueRefinement({id: 0, value: value.name, key: this.facet.key});
  }
  addExKeyRefinement() {
    this.refinementService.addExKeyRefinement({key: this.facet.key, id: this.facet.keyId});
  }

  addExKeyValueRefinement(value: FacetValues) {
    this.refinementService.addExKeyValueRefinement({id: 0, value: value.name, key: this.facet.key});
  }
}
