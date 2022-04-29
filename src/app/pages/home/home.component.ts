import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book.model';
import { Subscription } from 'rxjs';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  headerData: ITableHeader[] = [
    {
      field: 'author',
      title: 'Author'
    },
    {
      field: 'title',
      title: 'Title'
    },
    {
      field: 'year',
      title: 'Year'
    }
  ];
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
