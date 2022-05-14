import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortColumnComponent } from './shared/sort-column/sort-column.component';
import { CustomTableComponent } from './shared/custom-table/custom-table.component';
import { BooksComponent } from './pages/books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomButtonComponent } from './shared/custom-button/custom-button.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorFormDialogComponent } from './dialog/author-form-dialog/author-form-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorTextComponent } from './shared/form-error-text/form-error-text.component';
import { BookFormDialogComponent } from './dialog/book-form-dialog/book-form-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    SortColumnComponent,
    CustomTableComponent,
    BooksComponent,
    CustomButtonComponent,
    AuthorsComponent,
    AuthorFormDialogComponent,
    FormErrorTextComponent,
    BookFormDialogComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
