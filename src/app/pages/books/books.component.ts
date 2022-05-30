import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TABLE_HEADER_BOOKS } from 'src/app/constants/headerData.constants';
import { TAKE } from 'src/app/constants/myReadBooks.constants';
import { BookFormDialogComponent } from 'src/app/dialog/book-form-dialog/book-form-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { IBook } from 'src/app/interfaces/book.interface';
import { ISnackBar } from 'src/app/interfaces/snackBar.interface';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { BookDto } from 'src/app/models/bookDto.model';
import { BooksService } from 'src/app/services/books.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  totalBooks = 0;
  take = TAKE;
  pageSelected = 1;
  headerData: ITableHeader[] = TABLE_HEADER_BOOKS;
  bookList: BookDto[] = [];
  originalBookList: BookDto[] = [];
  subscriptions: Subscription[] = [];
  snackBarOptions: ISnackBar;
  isLoading = true;
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private booksService: BooksService,
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private messageService: MessageService
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
        this.bookList = books;
        this.originalBookList = books;
        this.pageSize(this.take);
        this.totalBooks = books.length;
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

  selectedPage(event: number){
    this.pageSelected = event;
    this.updateTable();
  }
  pageSize(event: number){
    this.take = event;
    this.messageService.emitUpdateTotalPages(this.take);
    if (this.take === 0 ){
      this.bookList = this.originalBookList;
      return;
    }
    this.updateTable();
  }

  updateTable(): void {
    const skip = (this.pageSelected - 1) * this.take;
    const lastEntryPosition = skip + this.take;
    this.bookList = this.originalBookList.slice(skip, lastEntryPosition);
  }

  searchEvent(word: string): void {
    this.bookList = this.originalBookList.filter( author => author['title'].includes(word));
  }
}
