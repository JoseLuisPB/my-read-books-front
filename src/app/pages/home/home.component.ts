import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headerData: string[] = ['author', 'title', 'year'];
  tableData: Book[] = [];
  isLoading = true;

  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.booksService.loadLastNBooks(10).subscribe( resp => {
      this.tableData = resp;
      this.isLoading = false;
    });
  }

}
