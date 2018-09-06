import { Component, OnInit } from '@angular/core'
import { TicketPurchaseByMonth, User } from '../../models'
import { UserService } from '../../services'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-profile-purchase',
  templateUrl: './profile-purchase.component.html',
})
export class ProfilePurchaseComponent implements OnInit {
  purchaseByMonth: TicketPurchaseByMonth[] = []
  currentUser: User

  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getPurchaseByMonth()
  }

  getPurchaseByMonth(): void {
    this.spinner.show()
    this.userService.purchaseByMonth(this.currentUser.id).pipe().subscribe(
      data => {
        const sortData = data.filter(item => item.tickets.length > 0)
        this.purchaseByMonth = sortData.reverse()
        this.spinner.hide()
      },
      error => {
        console.log('getPurchaseByMonth => ', error)
        this.spinner.hide()
      })
  }
}
