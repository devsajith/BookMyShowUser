import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndingComponent } from './ending/ending.component';
import { FpageComponent } from './fpage/fpage.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { UserGuardGuard } from './user-guard.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path:'',component:LandingComponent},
  { path:'login',component:LoginComponent},
  { path:'movies',component:MoviesComponent,canActivate:[UserGuardGuard]},
  { path:'home',component:HomeComponent,canActivate:[UserGuardGuard]},
  { path:'fpage',component:FpageComponent,canActivate:[UserGuardGuard]},
  { path:'welcome',component:WelcomeComponent,canActivate:[UserGuardGuard]},
  { path:'register',component:RegistrationComponent},
  { path:'',component:LandingComponent,canActivate:[UserGuardGuard]},
  { path:'ending',component:EndingComponent,canActivate:[UserGuardGuard]},
  { path:'search',component:SearchComponent,canActivate:[UserGuardGuard]},
  { path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
