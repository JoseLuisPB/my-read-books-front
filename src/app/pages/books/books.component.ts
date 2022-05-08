import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TABLE_HEADER_BOOKS } from 'src/app/constants/headerData';
import { BookFormDialogComponent } from 'src/app/dialog/book-form-dialog/book-form-dialog.component';
import { IBook } from 'src/app/interfaces/book.interface';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { Book } from 'src/app/models/book.model';
import { BookDto } from 'src/app/models/bookDto.model';
import { BooksService } from 'src/app/services/books.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  headerData: ITableHeader[] = TABLE_HEADER_BOOKS;
  tableData: BookDto[] = [];
  subscriptions: Subscription[] = [];
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.booksService.loadBooks().subscribe( books => {
        this.tableData = books;
      }, error => {
        console.error(error);
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createNewBook(): void{
    const newBookDialog = this.dialog.open(BookFormDialogComponent,{
      data: {book:{id: null}, action: 'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
    newBookDialog.afterClosed().subscribe(resp => {
      if(resp.save){
        this.booksService.saveBook(resp.book).subscribe( book => {
          console.log(book);
        })
      }
    })
  }

  updateBook(book: IBook): void {
    const updateBookDialog = this.dialog.open(BookFormDialogComponent, {
      data: {
        book: {
          id: book.id,
          idAuthor: book.idAuthor,
          title: book.title,
          year: book.year,
          author: book.author,
        },
        action: 'Modify'},
      disableClose: true,
      panelClass:'remove-dialog-padding'
    });

    this.subscriptions.push(
      updateBookDialog.afterClosed().subscribe(resp => {
        if ( resp.save) {
          this.booksService.updateBook(resp.book).subscribe(response => {
            console.log(response);
          })
        }
      }, error => {
        console.error(error);
      })
    );
  }

  deleteBook(book: IBook): void {
    this.booksService.deleteBook(book.id).subscribe(resp => console.log(resp));
  }

}
