import { Component, OnInit } from '@angular/core';
import { TicketPurchaseByMonth } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile-purchase',
  templateUrl: './profile-purchase.component.html',
})
export class ProfilePurchaseComponent implements OnInit {
  purchaseByMonth: TicketPurchaseByMonth[]

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getPurchaseByMonth()
  }

  getPurchaseByMonth() {
    this.userService.purchaseByMonth().pipe().subscribe(
      data => {
        this.purchaseByMonth = data.filter(item => item.tickets.length > 0)
      },
      error => {
        console.log(error)
      })
  }
}
