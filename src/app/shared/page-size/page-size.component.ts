import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {

  @Input() take!: number;
  pageSizes = [
    {value: 5, text: '5'},
    {value: 10, text: '10'},
    {value: 25, text: '25'},
    {value: 0, text: 'All'}
  ];

  pageControl: FormControl;

  @Output() pageSize = new EventEmitter<number>();

  constructor() {
    this.pageControl = new FormControl();
  }

  ngOnInit(): void {
    this.pageControl.setValue(this.take);
  }

  pageSizeHandler(event: any) {
    const take = parseInt(event.target.value)
    this.pageSize.emit(take);
  }
}
