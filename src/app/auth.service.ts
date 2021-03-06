import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user : any){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email: any, password: any) {
    return this.http.post('http://localhost:3000/authenticate', {'username' : email, 'password' : password}).toPromise();
  }

}
