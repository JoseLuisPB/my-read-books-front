import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TABLE_HEADER_BOOKS } from 'src/app/constants/headerData';
import { BookFormDialogComponent } from 'src/app/dialog/book-form-dialog/book-form-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { IBook } from 'src/app/interfaces/book.interface';
import { ISnackBar } from 'src/app/interfaces/snackBar.interface';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { BookDto } from 'src/app/models/bookDto.model';
import { BooksService } from 'src/app/services/books.service';
import { UtilsService } from 'src/app/services/utils.service';
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
  snackBarOptions: ISnackBar;
  isLoading = true;
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) {
    this.snackBarOptions = {
      message: '',
        panel: '',
        horizontalPosition: 'end',
        verticalPosition: 'top',
        time: 3000
    }
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.booksService.loadBooks().subscribe( books => {
        this.tableData = books;
        this.isLoading = false;
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
        this.subscriptions.push(
          this.booksService.saveBook(resp.book).subscribe( () => {
            this.snackBarOptions.message = 'Book created';
            this.utilsService.displaySnackBar(this.snackBarOptions);
            this.loadBooks();
          }, error => {
            this.utilsService.displaySnackBar(this.snackBarOptions, true);
            console.error(error);
          })
        );
      }
    }, error => {
      console.error(error);
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
          this.subscriptions.push(
            this.booksService.updateBook(resp.book).subscribe( () => {
              this.snackBarOptions.message = 'Book updated';
              this.utilsService.displaySnackBar(this.snackBarOptions);
              this.loadBooks();
            }, error => {
              this.utilsService.displaySnackBar(this.snackBarOptions, true);
              console.error(error);
            })
          );
        }
      }, error => {
        console.error(error);
      })
    );
  }

  deleteBook(book: IBook): void {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { bookTitle: book.title },
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });

    this.subscriptions.push(
      deleteDialog.afterClosed().subscribe(dialog => {
        if(dialog.delete) {
          this.subscriptions.push(
            this.booksService.deleteBook(book.id).subscribe( () => {
              this.snackBarOptions.message = 'Book deleted';
              this.utilsService.displaySnackBar(this.snackBarOptions);
              this.loadBooks();
            }, error => {
              console.error(error);
              this.utilsService.displaySnackBar(this.snackBarOptions, true);
            })
          )
        }
      }, error => {
        console.error(error);
      })
    );
  }
}
