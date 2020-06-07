import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.sass']
})
export class ItemCountComponent implements OnInit, OnChanges {
  private arrowVisible: boolean;
  constructor() { }
  @Input()
  itemCount: number;
  @Input()
  iconClass: string;
  @Input()
  active: boolean;
  @Output()
  public chipClick = new EventEmitter<MouseEvent>();
  color = 'grey';
  chipClass = '';
  ngOnInit(): void {
  }
  @Output()
  handleClick(event) {
    this.chipClick.emit(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.active) {
      this.color = 'primary';
      this.arrowVisible = true;
      this.chipClass = 'chip';
    } else {
      this.color = 'grey';
      this.arrowVisible = false;
      this.chipClass = '';
    }
  }
}
