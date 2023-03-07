import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  login(email: string, password: string): any {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
