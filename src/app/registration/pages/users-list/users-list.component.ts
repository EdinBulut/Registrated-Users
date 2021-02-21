import { User } from '../../models/user';
import { UsersService } from 'app/registration/services/users.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface Item { name: string; }

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  // pagination
  directionLinks = true;
  autoHide = false;
  responsive = true;
  maxSize = 7;
  itemsPerPage = 5;
  showHidePerPage = true;
  config: any;

  users: User[];
  usersList: User[];
  searchedUser: string;
  currentUser: any;
  currentUserEmail: string;

  constructor(private auth: AngularFireAuth, private router: Router, private service: UsersService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.currentUserEmail = JSON.parse(localStorage.getItem('userEmail'));

    this.service.getUsers().subscribe(actionArray => {
      this.users = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as object
        } as unknown as User;
      });
      this.users = this.users.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
      this.usersList = this.users;
      this.config = {
        id: 'first',
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.users.length
      };
      // console.log(this.users);
    });

    this.firestore.collection('users', ref => ref.where('email', '==', this.currentUserEmail)).valueChanges()
      .subscribe(val => {
        this.currentUser = val[0];
        // console.log(this.currentUser.email);
      });

    this.config = {
      id: 'first'
    };
  }

  onLogOut(): void {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  searchFunction(): void {
    this.users = this.usersList
      .filter(i => ((`${i.firstName} ${i.lastName}`).toLowerCase().indexOf(this.searchedUser.toLowerCase()) > -1));
    this.config.totalItems = this.users.length;
    this.config.currentPage = 1;
  }

  pageChange(event): void {
    this.config.currentPage = event;
  }

  toUserDetails(id: string): void {
    this.router.navigate(['/users', id]);
  }

}
