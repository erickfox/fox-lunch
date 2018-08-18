import { Component, OnInit } from '@angular/core'
import { AvailableTickets, User } from '../../models'
import { SaleService, UserService } from '../../services'

@Component({
  selector: 'app-tickets-sale',
  templateUrl: './tickets-sale.component.html',
})
export class TicketsSaleComponent implements OnInit {
  availableTickets: AvailableTickets[] = []
  currentUser: User
  modalIsOpen: boolean = true
  errorMessage: string = ''
  tickets: number = 0

  constructor(private saleService: SaleService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getUserInfo()
    this.getAvailable()
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
      }
    )
  }

  getAvailable(): void {
    this.saleService.available()
    .pipe()
    .subscribe(
      data => {
        this.availableTickets = data
      },
      error => {
        console.log('getAvailable => ', error)
      })
  }
}
