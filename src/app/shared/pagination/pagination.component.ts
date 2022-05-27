import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { FA_ICONS } from '../fa-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalEntries!: number;
  @Input() take!: number;
  totalPages = 0;
  faChevronLeft = FA_ICONS.solid.faChevronLeft;
  faChevronRight = FA_ICONS.solid.faChevronRight;
  currentPage = 1;
  pagesArray: number[] = [];
  displayDotsBefore = false;
  displayDotsAfter = true;
  @Output() selectedPage = new EventEmitter<number>();

  constructor(
    private messageService: MessageService
  ) {
    this.messageService.updateTotalPages.subscribe(take => {
      this.take = take;
      this.updateTotalPages(this.totalEntries);
    })
  }

  ngOnInit(): void {
    this.updateTotalPages(this.totalEntries);
  }

  previousPage(){
    const previousPage = this.currentPage - 1;
    if (previousPage >= 1){
      this.currentPage = previousPage;
      this.selectedPage.emit(this.currentPage);
    }
  }

  nextPage(){
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.currentPage = nextPage;
      this.selectedPage.emit(this.currentPage);
    }
  }

  updateTotalPages(totalEntries: number): void{
    if (this.take === 0 ){
      this.totalPages = 1;
      return;
    }
    this.totalPages = Math.ceil(totalEntries / this.take);
  }
}
