import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from 'app/registration/pages/users-list/users-list.component';
import { CountryPickerModule } from 'ngx-country-picker';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersService } from 'app/registration/services/users.service';
import { HighlightTextPipe } from 'app/registration/pipes/highlight-text.pipe';
import { UserDetailsComponent } from 'app/registration/pages/user-details/user-details.component';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    UsersListComponent,
    HighlightTextPipe,
    UserDetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    CountryPickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [UsersService]
})
export class RegistrationModule { }
