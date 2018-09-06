import { Component, OnInit } from '@angular/core'
import { TicketsSold, User } from '../../models'
import { UserService } from '../../services'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-profile-sales',
  templateUrl: './profile-sales.component.html',
})
export class ProfileSalesComponent implements OnInit {
  ticketsSold: TicketsSold[] = []
  currentUser: User

  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getTicketsSold()
  }

  getTicketsSold(): void {
    this.spinner.show()
    this.userService.ticketsSold(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
          this.ticketsSold = data
          this.spinner.hide()
        },
        error => {
          console.log('getTicketsSold => ', error)
          this.spinner.hide()
        })
  }
}
