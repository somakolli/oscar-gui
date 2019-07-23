import {Component, Input, OnInit} from '@angular/core';
import {Suggestion} from '../../../../../models/osm/tag-suggestion';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.sass']
})
export class SuggestionDetailComponent implements OnInit {
  @Input()
  suggestion: Suggestion;
  constructor() { }

  ngOnInit() {

  }

}
