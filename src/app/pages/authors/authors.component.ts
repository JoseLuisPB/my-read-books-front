import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TABLE_HEADER_AUTHORS } from 'src/app/constants/headerData';
import { AuthorFormDialogComponent } from 'src/app/dialog/author-form-dialog/author-form-dialog.component';
import { ISnackBar } from 'src/app/interfaces/snackBar.interface';
import { ITableHeader } from 'src/app/interfaces/tableHeader.interface';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  authorsLoaded = false;
  headerData: ITableHeader[] = TABLE_HEADER_AUTHORS;
  authorList: Author[] = [];
  subscriptions: Subscription[] = [];
  snackBarOptions: ISnackBar;
  faPlus = FA_ICONS.solid.faPlus;

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private utilsService: UtilsService
    )
    {
      this.snackBarOptions = {
        message: '',
        panel: '',
        horizontalPosition: 'end',
        verticalPosition: 'top',
        time: 3000
      }
    }

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
      }, error => {
        console.error(error);
      })
    );
  }

  createNewAuthor():void {
    const newAuthorDialog = this.dialog.open(AuthorFormDialogComponent, {
      data: {author: {id: null}, action:'Create'},
      disableClose: true,
      panelClass: 'remove-dialog-padding'
    });

    this.subscriptions.push(
      newAuthorDialog.afterClosed().subscribe(dialogResp => {
        if (dialogResp.save === true){
          this.authorService.saveAuthor(dialogResp.author).subscribe( serviceResp => {
            this.snackBarOptions.message = 'Author created';
            this.snackBarOptions.panel = 'snackSuccess';
            this.utilsService.displaySnackBar(this.snackBarOptions);
            this.authorList.push(serviceResp)
          }, error => {
            this.snackBarOptions.message = 'Oops something went wrong, try again';
            this.snackBarOptions.panel = 'snackError';
            this.utilsService.displaySnackBar(this.snackBarOptions);
            console.error(error);
          });
        }
      }, error => {
        console.error(error);
      })
    );
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
          this.authorService.updateAuthor(resp.author).subscribe( () => {
            this.snackBarOptions.message = 'Author modfied';
            this.snackBarOptions.panel = 'snackSuccess'
            this.utilsService.displaySnackBar(this.snackBarOptions);
            this.loadAuthorList();
          }, error => {
            this.snackBarOptions.message = 'Oops something went wrong, try again';
            this.snackBarOptions.panel = 'snackError';
            this.utilsService.displaySnackBar(this.snackBarOptions);
            console.error(error);
          });
        }
      }, error => {
        console.error(error);
      })
    );
  }
}
