import {Component, Input, OnInit} from '@angular/core';
import {Facet, FacetValues} from '../../../../models/oscar/refinements';
import {RefinementsService} from '../../../../services/data/refinements.service';
import {RefinementType} from '../../../../models/gui/refinement';

@Component({
  selector: 'app-facets-detail',
  templateUrl: './facets-detail.component.html',
  styleUrls: ['./facets-detail.component.sass']
})
export class FacetsDetailComponent implements OnInit {

  constructor(private refinementService: RefinementsService) { }
  @Input()
  facet: Facet;
  @Input()
  expanded: boolean;
  ngOnInit() {
  }

  addKeyRefinement() {
    this.refinementService
      .addRefinement(
        {key: this.facet.key, value: '', id: this.facet.keyId, refinementType: RefinementType.Key, excluding: false}
        );
  }

  addkeyValueRefinement(value: FacetValues) {
    this.refinementService
      .addRefinement(
        {key: this.facet.key, value: value.name, id: this.facet.keyId, refinementType: RefinementType.KeyValue, excluding: false});
  }
  addExKeyRefinement() {
    this.refinementService
      .addRefinement(
        {key: this.facet.key, value: '', id: this.facet.keyId, refinementType: RefinementType.Key, excluding: true});
  }

  addExKeyValueRefinement(value: FacetValues) {
    this.refinementService
      .addRefinement(
        {key: this.facet.key, value: value.name, id: this.facet.keyId, refinementType: RefinementType.KeyValue, excluding: true});
  }
}
