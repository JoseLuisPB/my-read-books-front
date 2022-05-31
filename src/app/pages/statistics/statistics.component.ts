import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookDto } from 'src/app/models/bookDto.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  booksList: BookDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.booksService.loadBooks().subscribe( booksList => {
        this.booksList = booksList;
        this.dataLoaded = true;
      }, error => {
        console.error(error);
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
