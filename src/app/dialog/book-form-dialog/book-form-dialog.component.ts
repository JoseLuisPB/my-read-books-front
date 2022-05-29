import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ISnackBar } from 'src/app/interfaces/snackBar.interface';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';
import { AuthorFormDialogComponent } from '../author-form-dialog/author-form-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss']
})
export class BookFormDialogComponent implements OnInit, OnDestroy {

  action = '';
  faSave = FA_ICONS.solid.faSave;
  faUser = FA_ICONS.solid.faUser;
  saveDisabled = true;
  formDataLoaded = false;
  bookForm: FormGroup;
  subscriptions: Subscription[] = []
  authorList: Author[] = [];
  snackBarOptions: ISnackBar;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private utilsService: UtilsService,
    private bookDialogForm: MatDialogRef<BookFormDialogComponent>,
    private confirmDialog: MatDialog,
    private authorDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.snackBarOptions = {
      message: '',
      panel: '',
      horizontalPosition: 'end',
      verticalPosition: 'top',
      time: 3000
    }
    this.action = this.data.action;
    this.bookForm = this.initForm();
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadAuthors():void {
    this.subscriptions.push(
      this.authorService.loadAuthors().subscribe( authors =>{
        this.authorList = authors.sort((a: Author, b: Author) => ( a.fullName < b.fullName ? -1 : 1));
        if( this.data.book.id) this.formPatchValues();
        this.saveDisabled = false;
        this.formDataLoaded = true;
      }, error => {
        console.error(error);
      })
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: [this.getYear(), Validators.required]
    })
  }

  formPatchValues(): void {
    this.bookForm.patchValue({
      title: this.data.book.title,
      author: this.data.book.idAuthor,
      year: this.data.book.year
    })
  }

  getYear(): number {
    const today = new Date();
    return today.getFullYear();
  }

  closeDialog(): void {
    if(this.bookForm.touched) {
      const dialogConfirm = this.confirmDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        panelClass: 'remove-dialog-padding'
      });

      this.subscriptions.push(
        dialogConfirm.afterClosed().subscribe( dialog => {
          if(dialog.confirm) this.bookDialogForm.close({save: false});
        }, error => {
          console.error(error);
        })
      )
    } else {
      this.bookDialogForm.close({save: false});
    }
  }

  saveForm(): void{
    if(! this.bookForm.valid) {
      this.utilsService.markFormGroupTouched(this.bookForm);
      return;
    }
    this.bookDialogForm.close({
      save: true,
      book: {
        id: this.data.book.id,
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        year: this.bookForm.get('year')?.value,
      }
    });
  }

  createNewAuthor():void{
    const createAuthor = this.authorDialog.open(AuthorFormDialogComponent, {
      data: {author: {id: null}, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
    this.subscriptions.push(

    )
    createAuthor.afterClosed().subscribe(dialogResp => {

      if (dialogResp.save === true) {
        this.saveDisabled = true;
        this.formDataLoaded = false;
        this.authorService.saveAuthor(dialogResp.author).subscribe(serviceResp => {
          this.snackBarOptions.message = 'Author created';
          this.utilsService.displaySnackBar(this.snackBarOptions);
          this.loadAuthors();
        }, error => {
          console.error(error);
          this.saveDisabled = false;
          this.formDataLoaded = true;
        })
      }
    })
  }
}
