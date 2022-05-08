import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Subscription } from 'rxjs';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { BookDto } from 'src/app/models/bookDto.model';
import { TABLE_HEADER_BOOKS } from 'src/app/constants/headerData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = true;
  headerData: ITableHeader[] = TABLE_HEADER_BOOKS;
  tableData: BookDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.booksService.loadLastNBooks(10).subscribe( books => {
        this.tableData = books;
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
