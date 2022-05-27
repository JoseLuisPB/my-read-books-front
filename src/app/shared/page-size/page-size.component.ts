import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {

  /* pageSizes = [
    {value: 10, text: '10'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
    {value: 0, text: 'All'}
  ];
 */
  @Input() take!: number;
  pageSizes = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
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
