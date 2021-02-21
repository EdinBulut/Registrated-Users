import { LoginComponent } from './registration/pages/login/login.component';
import { RegisterComponent } from './registration/pages/register/register.component';
import { UsersListComponent } from './registration/pages/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserDetailsComponent } from './registration/pages/user-details/user-details.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['users']);

const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent,
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  {path: 'login', component: LoginComponent,
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  {path: 'users', component: UsersListComponent,
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'users/:id', component: UserDetailsComponent,
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
