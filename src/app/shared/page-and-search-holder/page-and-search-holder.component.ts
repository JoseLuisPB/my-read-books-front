import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-and-search-holder',
  templateUrl: './page-and-search-holder.component.html',
  styleUrls: ['./page-and-search-holder.component.scss']
})
export class PageAndSearchHolderComponent implements OnInit {

  @Input() take!:number;
  @Input() totalBooks!: number;
  @Output() pageSize = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() selectedPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageSizeHandler(take: number): void {
    this.pageSize.emit(take);
  }

  searchWord(word: string):void{
    this.searchEvent.emit(word);
  }

  currentPage(page: number): void {
    this.selectedPage.emit(page);
  }

}
