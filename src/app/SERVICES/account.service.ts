import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCreds } from '../INTERFACES/LoginCreds';
import { NewUser } from '../INTERFACES/NewUser';
import { UserView } from '../INTERFACES/UserView';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private ServerUrl = 'https://localhost:7166/api';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCreds): Observable<any> {

    return this.http.post<any>(`${this.ServerUrl}/Account/Login`, credentials);
  }
  logout(): Observable<any> {
    return this.http.get<any>(`${this.ServerUrl}/Account/Logout`);
  }
  register(userDetails: NewUser): Observable<any> {

    return this.http.post<any>(`${this.ServerUrl}/Account/Register`, userDetails);
  }
  validateUserSession(): Observable<any>  {
    return this.http.get<any>(`${this.ServerUrl}/Account`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.ServerUrl}/Account/GetAll`);
  }
}
