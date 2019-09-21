import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly API_URL = 'http://localhost:3000';
  readonly MY_HEADER = { 'Content-Type': 'application/json' };
  

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  getBase2() {
    this.http.get(this.API_URL + '/')    
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );      
  }

  getBase() {
    this.http.get(this.API_URL + '/path1')    
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );      
  }

  verify() {
    this.http.get(this.API_URL + '/token/verify')    
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );    
  }

  login() {
    this.http.get(this.API_URL + '/token/sign')
      .subscribe(
        (res) => {
          console.log(res);
          if (res['token']) {
            localStorage.setItem('token', res['token']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
