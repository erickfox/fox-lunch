import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AvailableTickets, User } from '../../models'
import { SaleService, UserService, PurchaseService } from '../../services'
import { NotifierService } from 'angular-notifier'

@Component({
  selector: 'app-tickets-sale',
  templateUrl: './tickets-sale.component.html',
})
export class TicketsSaleComponent implements OnInit {
  availableTickets: AvailableTickets[] = []
  currentUser: User
  modalIsOpen: boolean = false
  errorMessage: string = ''
  tickets: number = 0
  typeSale: number = 2
  exchange: AvailableTickets = null

  constructor(private router: Router, private saleService: SaleService, private userService: UserService, private purchaseService: PurchaseService, private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getUserInfo()
    this.getAvailable()
  }

  modalOpen(exchange: AvailableTickets): void {
    this.exchange = exchange
    this.modalIsOpen = true
  }

  closeModal(): void {
    this.modalIsOpen = false
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

  getAvailable(): void {
    this.saleService.available()
      .pipe()
      .subscribe(
        data => {
          this.availableTickets = data.filter(item => item.UserId !== this.currentUser.id)
        },
        error => {
          console.log('getAvailable => ', error)
        })
  }

  purchase(exchange: AvailableTickets): void {
    const params = {
      user_sale: exchange.UserId,
      user_purchase: this.currentUser.id,
      sale_type: this.typeSale,
      exchange_id: exchange.id,
      menu_id: exchange.MenuId,
      date: exchange.Menu.date
    }

    this.purchaseService.purchase(params)
      .pipe()
      .subscribe(
        data => {
          this.closeModal()
          this.showAlert('success', 'Tu canje ha sido realizado')
          this.router.navigate(['/'])
        },
        error => {
          this.showAlert('error', error)
        })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
