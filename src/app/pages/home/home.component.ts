import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  headerData: string[] = ['author', 'title', 'year'];
  tableData: Book[] = [];
  isLoading = true;
  subscriptions: Subscription[] = [];

  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.booksService.loadLastNBooks(10).subscribe( resp => {
        this.tableData = resp;
        this.isLoading = false;
      }, error => {
        console.error(error);
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }
}
