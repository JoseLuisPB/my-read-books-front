import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
  authorsLoaded = false;
  authorList: Author[] = [];
  subscriptions: Subscription[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
      this.authorService.loadAuthors().subscribe( authors => {
        this.authorList = authors;
        this.authorsLoaded = true;
      })
    );
  }

  createNewAuthor():void {
    const newAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data: {author: {id: null, fullName: null, country: null}, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });

    this.subscriptions.push(
      newAuthorDialog.afterClosed().subscribe(resp => {
        if (resp.save === true){
          const author: Author = this.createAuthorDto(resp);
          this.authorService.saveAuthor(author).subscribe( resp => {
            this.displaySnackBar('Author created', 'snackSuccess');
            this.authorList.push(resp)
          }, error => {
            this.displaySnackBar('Oops something went wrong, try again', 'snackError');
            console.error(error);
          });
        }
      }, error => {
        console.error(error);
      })
    );
  }

  createAuthorDto(author: any): Author {
    const authorDto: Author = {
      id: author.id,
      fullName: author.fullName,
      country: author.country
    }
    return authorDto;
  }

  updateAuthor(event: Author):void {
    const updateAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data:{author: event,action:'Modify'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });
    this.subscriptions.push(
      updateAuthorDialog.afterClosed().subscribe( resp => {
        if (resp.save === true){
          const author: Author = this.createAuthorDto(resp);
          this.authorService.updateAuthor(author).subscribe( () => {
            this.displaySnackBar('Author modfied', 'snackSuccess');
            this.loadAuthorList();
          }, error => {
            this.displaySnackBar('Oops something went wrong, try again', 'snackError');
            console.error(error);
          });
        }
      }, error => {
        console.error(error);
      })
    );
  }

  displaySnackBar(message: string, panel: string, time: number = 3000): void{
    this.openSnackBar(message, panel);
    setTimeout( () => this.closeSnackBar(), time);
  }
  openSnackBar(message: string, panel: string): void {
    this.snackBar.open(message, 'x' ,
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: panel
      });
  }
  closeSnackBar(): void {
    this.snackBar.dismiss();
  }

}
