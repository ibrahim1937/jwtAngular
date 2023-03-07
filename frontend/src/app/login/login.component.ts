import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../store/actions/auth.actions';
import { AuthState } from '../store/reducers/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {

  loginPayload = {
    email: '',
    password: ''
  }

  constructor(private store: Store<AuthState>) { }


  login(event : Event){
    event.preventDefault();


    this.store.dispatch(login({ email: this.loginPayload.email, password: this.loginPayload.password }))

  }

}
