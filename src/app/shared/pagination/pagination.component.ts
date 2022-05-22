import { Component, Input, OnInit } from '@angular/core';
import { FA_ICONS } from '../fa-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  faChevronLeft = FA_ICONS.solid.faChevronLeft;
  faChevronRight = FA_ICONS.solid.faChevronRight;
  @Input() totalPages = 10;
  numberOfPages = 5;
  currentPage = 1;
  pagesArray: number[] = [];
  displayDotsBefore = false;
  displayDotsAfter = true;

  constructor() { }

  ngOnInit(): void {
    this.createPagesArray(1);
  }

  createPagesArray(page: number): void {
    this.currentPage = page;
    this.pagesArray = [];
    let adjustPage = Math.floor(this.numberOfPages / 2) * (-1);
    for(let i = 0; i < this.numberOfPages; i++){
      const pageToAdd = this.currentPage + adjustPage;
      if( pageToAdd < 1 ) {
        i--;
      }
      else if (pageToAdd === 1){

      }
      else if (pageToAdd === this.totalPages ) {

      }
      else if (pageToAdd > this.totalPages) {
        this.pagesArray.unshift(this.pagesArray[0] - 1);
        if (this.pagesArray[0] === 1){
          this.pagesArray.splice(0, 1);
        }

      }
      else {
        this.pagesArray.push(pageToAdd);
      }
      adjustPage++;

    }
    this.displayDots();
  }

  displayDots(): void{
    this.pagesArray.some( item => item <= 2) ?  this.displayDotsBefore = false : this.displayDotsBefore = true;
    this.pagesArray.some( item => item >= (this.totalPages -1)) ? this.displayDotsAfter = false : this.displayDotsAfter = true;
  }

  previousPage(){
    const previousPage = this.currentPage - 1;
    if (previousPage >= 1){
      this.createPagesArray(previousPage);
    }
  }

  nextPage(){
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.createPagesArray(nextPage);
    }
  }
}
