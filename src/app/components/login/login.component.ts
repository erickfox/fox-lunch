import { Component } from '@angular/core';
import { User } from '../../services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model: any = {};

  constructor() {

  }

  login() {
    const response = User.auth(this.model)
    console.log(response)
  }
}
