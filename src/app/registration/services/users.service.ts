import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore  ) { }


  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').snapshotChanges();
  }

  getUser(id: string): Observable<any> {
    return this.firestore.collection('/users', ref => ref.where('id', '==', id)).valueChanges();
  }
}
