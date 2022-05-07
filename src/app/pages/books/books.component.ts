import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

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
      field: 'country',
      title: 'Country'
    },
    {
      field: 'year',
      title: 'Year'
    },
  ];
  tableData: Book[] = [];
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.booksService.loadBooks().subscribe( books => {
      console.log(books);
      this.tableData = books;
    });
  }

  createNewBook(): void{
    const newBookDialog = this.dialog.open(ConfirmDialogComponent,{
      data: '',
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
  }

}
