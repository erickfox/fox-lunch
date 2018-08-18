import { Component, OnInit } from '@angular/core';
import { TicketsSold, User } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile-sales',
  templateUrl: './profile-sales.component.html',
})
export class ProfileSalesComponent implements OnInit {
  ticketsSold: TicketsSold[]
  currentUser: User

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getTicketsSold()
  }

  getTicketsSold(): void {
    this.userService.ticketsSold(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
          this.ticketsSold = data
        },
        error => {
          console.log(error)
        })
  }
}
