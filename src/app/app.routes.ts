import {Routes} from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { HomeComponent } from './pages/home/home.component';

export const ROUTES: Routes = [
  {path:'home', component: HomeComponent },
  {path:'books', component: BooksComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
]
