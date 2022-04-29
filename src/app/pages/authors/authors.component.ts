import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthorFormDialogComponent } from 'src/app/dialog/author-form-dialog/author-form-dialog.component';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  headerData: ITableHeader[] = [
    {
      field: 'fullName',
      title: 'Author'
    },
    {
      field: 'country',
      title: 'Country'
    }
  ];
  authorList: Author[] = [];
  subscriptions: Subscription[] = [];
  faPlus = FA_ICONS.solid.faPlus;
  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
    )
    { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authorService.loadAuthors().subscribe( resp => {
        this.authorList = resp;
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createNewAuthor():void {
    const newAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data: {id: null, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });

    newAuthorDialog.afterClosed().subscribe(resp => {
      if (resp.save === true){
        const author: Author = {
          id: resp.id,
          fullName: resp.fullName,
          country: resp.country
        }
        this.authorService.saveAuthor(author).subscribe( resp => this.authorList.push(resp));
      }
    })
  }

}
