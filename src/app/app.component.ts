import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // registration
  registerOrLogin = 'Register';
  options = ['Register', 'Login'];

  constructor(public router: Router, private auth: AngularFireAuth) {
  }

  onLogOut(): void {
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }

}
