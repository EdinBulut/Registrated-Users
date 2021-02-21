import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryPickerService } from 'ngx-country-picker';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('userForm', { static: false }) userForm: NgForm;
  userInfo = { email: '', password: '' };
  errorMessage: string;

  constructor(protected countryPicker: CountryPickerService,
              private auth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {}

  onLogin(): void {

    if (this.userForm.valid) {
      localStorage.setItem(
        'userEmail',
        JSON.stringify(this.userInfo.email)
      );
      // console.log(this.userInfo);

      this.auth.signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
        .then(() => this.router.navigate(['users']))
        .catch(err => {
          // console.log(err.message);
          this.errorMessage = err.message;
        });

    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.controls[key].markAllAsTouched();
      });
    }
  }

}
