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
    this.loadAuthorList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadAuthorList(): void {
    this.subscriptions.push(
      this.authorService.loadAuthors().subscribe( authors => this.authorList = authors)
    );
  }

  createNewAuthor():void {
    const newAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data: {author: {id: null, fullName: null, country: null}, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });

    newAuthorDialog.afterClosed().subscribe(resp => {
      if (resp.save === true){
        const author: Author = this.createAuthorDto(resp);
        this.authorService.saveAuthor(author).subscribe( resp => this.authorList.push(resp));
      }
    })
  }

  updateAuthor(event: Author):void {
    const updateAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data:{author: event,action:'Modify'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
    updateAuthorDialog.afterClosed().subscribe( resp => {
      if (resp.save === true){
        const author: Author = this.createAuthorDto(resp);
        this.authorService.updateAuthor(author).subscribe( () => this.loadAuthorList());
      }
    });
  }

  createAuthorDto(author: any): Author {
    const authorDto: Author = {
      id: author.id,
      fullName: author.fullName,
      country: author.country
    }
    return authorDto;
  }

}
