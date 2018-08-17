import { Component } from '@angular/core'
import { User } from '../../models'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  currentUser: User

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
