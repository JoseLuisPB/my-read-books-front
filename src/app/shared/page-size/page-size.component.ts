import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PAGESIZE } from 'src/app/constants/myReadBooks.constants';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {

  @Input() take!: number;
  pageSizes = PAGESIZE;

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
