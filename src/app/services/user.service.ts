import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import config from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = 'https://emp-app-1.herokuapp.com'

  public createUserUrl = 'http://localhost:5000/api/user/create';
  public authUserUrl = 'http://localhost:5000/api/user/auth';
  public getAllUsersUrl = 'http://localhost:5000/api/user/getall';
  public getSingleUserUrl = 'http://localhost:5000/api/user/getone';

  public event = new Subject;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if(config.env === 'prod') {
      this.createUserUrl = this.baseUrl+'/api/user/create';
      this.authUserUrl = this.baseUrl+'/api/user/auth';
      this.getAllUsersUrl = this.baseUrl+'/api/user/getall';
      this.getSingleUserUrl = this.baseUrl+'/api/user/getone';
    }
  }

  saveUserToken(token) {
    localStorage.setItem('token', token);
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserDepartment() {
    let user = this.getUser();
    return user['department'];
  }

  signUp(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.createUserUrl, user, {headers: headers});
  }

  authUser(email, password) {
    var payload = {
      email,
      password
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.authUserUrl, payload, {headers: headers});
  }

  getAllUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    var payload = {
      userId: this.getUser()['_id']
    }
    return this.http.post(this.getAllUsersUrl, payload, {headers: headers});
  }

  getSingleUser(id) {
    var payload = {
      userId: this.getUser()['_id'],
      requestedUserId: id
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getSingleUserUrl, payload, {headers: headers});
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  emit(data) {
    this.event.next(data);
  }

  listen() {
    return this.event.asObservable();
  }

}
