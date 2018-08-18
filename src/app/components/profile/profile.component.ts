import { Component, OnInit } from '@angular/core'
import { User } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  currentUser: User
  tickets: number = 0

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo(): void {
    this.userService.getOne(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
          this.tickets = data.tickets
        },
        error => {
          console.log('getAvailable => ', error)
        })
  }
}
