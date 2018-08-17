import { Component, OnInit } from '@angular/core';
import { TicketsSold } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile-sales',
  templateUrl: './profile-sales.component.html',
})
export class ProfileSalesComponent implements OnInit {
  ticketsSold: TicketsSold[]

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getTicketsSold()
  }

  getTicketsSold() {
    this.userService.ticketsSold().pipe().subscribe(
      data => {
        this.ticketsSold = data
      },
      error => {
        console.log(error)
      })
  }
}
