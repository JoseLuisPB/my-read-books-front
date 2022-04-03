import {Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './shared/loading/loading.component';

export const ROUTES: Routes = [
  {path:'home', component: HomeComponent },
  {path:'loading', component:LoadingComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
]
