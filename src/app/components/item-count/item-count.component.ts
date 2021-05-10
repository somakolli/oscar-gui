import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isWhitespace} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.sass']
})
export class ItemCountComponent implements OnInit, OnChanges {
  private arrowVisible: boolean;
  constructor() { }
  @Input()
  text: string;
  @Input()
  iconClass: string;
  @Input()
  active: boolean;
  @Output()
  public chipClick = new EventEmitter<MouseEvent>();
  chipClass = '';
  backgroundColor = 'white';
  ngOnInit(): void {
  }
  @Output()
  handleClick(event) {
    this.chipClick.emit(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.active) {
      this.backgroundColor = '#3f51b5';
      this.arrowVisible = true;
      this.chipClass = 'chip';
    } else {
      this.backgroundColor = 'white';
      this.arrowVisible = false;
      this.chipClass = '';
    }
  }
}
