import { Component, OnInit } from '@angular/core';
import { TicketPurchaseByMonth, User } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile-purchase',
  templateUrl: './profile-purchase.component.html',
})
export class ProfilePurchaseComponent implements OnInit {
  purchaseByMonth: TicketPurchaseByMonth[] = []
  currentUser: User

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getPurchaseByMonth()
  }

  getPurchaseByMonth(): void {
    this.userService.purchaseByMonth(this.currentUser.id).pipe().subscribe(
      data => {
        this.purchaseByMonth = data.filter(item => item.tickets.length > 0)
      },
      error => {
        console.log('getPurchaseByMonth => ', error)
      })
  }
}
