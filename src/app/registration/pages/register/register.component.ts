import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user';
import { ICountry } from 'ngx-country-picker/country.interface';
import { CountryPickerService } from 'ngx-country-picker';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;

  ///// USER FORM
  @ViewChild('userForm', { static: false }) userForm: NgForm;
  userInfoDefault = new User('', '', '', 'assets/images/avatar.png', '', '', '', '', '',
    { country: 'Bosnia and Herzegovina', flag: './assets/country-flags/bih.svg', state: '', city: '', zip: '', street: '' });
  userInfo = this.userInfoDefault;

  // country
  public countries: ICountry[] = [];

  // state-region-province
  states = [];

  // city
  cities = [];
  canSelectCity = true;
  @ViewChild('cityName', { static: false }) cityName: ElementRef;

  // phone
  dialNumber = '+387';


  constructor(protected countryPicker: CountryPickerService,
              private auth: AngularFireAuth,
              private router: Router,
              private firestore: AngularFirestore) { }

  ngOnInit(): void {

    // get countries
    this.countryPicker.getCountries()
      .subscribe((countries: ICountry[]) => {
        this.countries = countries.sort((c1, c2) => (c1.name.common > c2.name.common ? 1 : -1));
      });
  }

  // sign in form
  onSignIn(): void {
    if (this.userForm.valid) {
      localStorage.setItem(
        'userEmail',
        JSON.stringify(this.userInfo.email)
      );
      this.userInfo.id = `${this.userInfo.firstName.toLowerCase()}-${this.userInfo.lastName.toLowerCase()}-${uuidv4()}`;
      // console.log(this.userInfo);

      this.auth.createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
      .then((() => {
        this.userInfo.phone = `(${this.dialNumber})${this.userInfo.phone}`;
        const data = Object.assign({}, this.userInfo);
        this.firestore.collection('users').add(data);
      }))
        .then(() => this.router.navigate(['users']))
        .catch(err => {
          console.log(err.message);
          this.errorMessage = err.message;
        });
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.controls[key].markAllAsTouched();
      });
    }
  }

  // country
  onCountryChange(value: string): void {
    this.userInfo.address.state = '';
    let country: any;
    country = this.countries.filter(c => c.name.common === value)[0];

    this.userInfo.address.flag = `./assets/country-flags/${country.cca3.toLowerCase()}.svg`;
    if (country.idd.suffixes.length <= 1) {
      this.dialNumber = `${country.idd.root}${country.idd.suffixes[0]}`;
    } else {
      this.dialNumber = country.idd.root;
    }

  }


}

