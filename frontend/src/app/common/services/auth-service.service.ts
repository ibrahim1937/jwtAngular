import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  getAccessToken() : Observable<User> {
    throw new Error("Method not implemented.");
  }
  logout() {
    throw new Error("Method not implemented.");
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token : string}>('http://localhost:8080/api/v1/auth/authenticate', { email, password });
  }


}
