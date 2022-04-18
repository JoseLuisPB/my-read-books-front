import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { LoadingComponent } from './shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortColumnComponent } from './shared/sort-column/sort-column.component';
import { CustomTableComponent } from './shared/custom-table/custom-table.component';
import { BooksComponent } from './pages/books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomButtonComponent } from './shared/custom-button/custom-button.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
