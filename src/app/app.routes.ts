import {Routes} from '@angular/router';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BooksComponent } from './pages/books/books.component';
import { HomeComponent } from './pages/home/home.component';

export const ROUTES: Routes = [
  {path:'home', component: HomeComponent },
  {path:'books', component: BooksComponent},
  {path:'authors', component: AuthorsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
]
