import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorFormDialogComponent } from 'src/app/dialog/author-form-dialog/author-form-dialog.component';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  faPlus = FA_ICONS.solid.faPlus;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createNewAuthor():void {
    const newAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data: {id: null, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
  }

}
