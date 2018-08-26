import { Component, OnInit } from '@angular/core'
import { Exchange, User } from '../../models'
import { ExchangeService, SaleService } from '../../services'
import { NotifierService } from 'angular-notifier'

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
})
export class ExchangeComponent implements OnInit {
  exhanges = []
  parseCurrentDate: string = this.getParseCurrentDate()
  currentUser: User
  modalIsOpen: boolean = false
  exchangeSelected = null
  type: string = ''

  constructor(private exchangeService: ExchangeService, private notifierService: NotifierService, private saleService: SaleService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getExhanges()
  }

  openModal(exchange, type: number): void {
    this.type = type === 1 ? 'vender' : 'cancelar'
    this.exchangeSelected = exchange
    this.modalIsOpen = true
  }

  closeModal(): void {
    this.modalIsOpen = false
  }

  getExhanges(): void {
    this.exchangeService.exchangesUser(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
          this.exhanges = []
          data.forEach(exchange => {
            const item = {
              id: exchange.id,
              date: exchange.date,
              menu: {
                id: exchange.Menu.id,
                name: exchange.Menu.name,
                description: exchange.Menu.description,
                garnish: exchange.Menu.garnish.split(',')
              }
            }

            this.exhanges.push(item)
          })
        },
        error => {
          console.log('getExhanges => ', error)
        })
  }

  cancelExchage(exchange): void {
    const params = {
      exchange_id: exchange.id
    }

    this.exchangeService.cancel(params)
      .pipe()
      .subscribe(
        data => {
          this.showAlert('success', 'Tu canje ha sido cancelado')
          this.closeModal()
          this.getExhanges()
        },
        error => {
          this.showAlert('error', error)
          this.closeModal()
        })
  }

  sellTicket(exchange): void {
    const params = {
      exchange_id: exchange.id
    }

    this.saleService.sell(params)
      .pipe()
      .subscribe(
        data => {
          this.showAlert('success', 'Tu ticket se ha puesto en venta')
          this.closeModal()
          this.getExhanges()
        }, error => {
          this.showAlert('error', error)
          this.closeModal()
        })
  }

  getParseCurrentDate(): string {
    const typeDate = new Date()
    let month: number = typeDate.getMonth() + 1
    let parseMonth: string = ''

    if (month < 10) {
      parseMonth = '0' + month
    }

    return typeDate.getFullYear() + '-' + parseMonth + '-' + typeDate.getDate()
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
