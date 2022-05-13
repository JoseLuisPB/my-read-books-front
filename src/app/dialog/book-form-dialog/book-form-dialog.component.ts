import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss']
})
export class BookFormDialogComponent implements OnInit, OnDestroy {

  action = '';
  faSave = FA_ICONS.solid.faSave;
  saveDisabled = true;
  formDataLoaded = false;
  bookForm: FormGroup;
  subscriptions: Subscription[] = []
  authorList: Author[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private utilService: UtilsService,
    private bookDialogForm: MatDialogRef<BookFormDialogComponent>,
    private confirmDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.action = this.data.action;
    this.bookForm = this.initForm();
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
        dialogConfirm.afterClosed().subscribe( resp => {
          if(resp.close) this.bookDialogForm.close({save: false});
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
      this.utilService.markFormGroupTouched(this.bookForm);
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
}
