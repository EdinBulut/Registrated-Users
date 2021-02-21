import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: string;
  user: any;

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    this.activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        this.userId = params.get('id');
        // console.log(this.userId);
      });
  }

  ngOnInit(): void {
    this.firestore.collection('users', ref => ref.where('id', '==', this.userId)).valueChanges()
    .subscribe(val => {
      this.user = val[0];
      // console.log(this.user);
    });
    }

}
