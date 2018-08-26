import { Component, OnInit } from '@angular/core';
import { Exchange, User } from '../../models'
import { ExchangeService, SaleService } from '../../services'
import { NotifierService } from 'angular-notifier'

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
})
export class ExchangeComponent implements OnInit {
  exhanges = []
  currentUser: User

  constructor(private exchangeService: ExchangeService, private notifierService: NotifierService, private saleService: SaleService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getExhanges()
  }

  getExhanges(): void {
    this.exchangeService.exchangesUser(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
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

  cancelExchage(): void {
    const params = {
      exchange_id: 1
    }

    this.exchangeService.cancel(params)
      .pipe()
      .subscribe(
        data => {
          this.showAlert('success', 'Tu canje ha sido cancelado')
        },
        error => {
          this.showAlert('error', error)
        })
  }

  sellTicket(): void {
    const params = {
      exchange_id: 1
    }

    this.saleService.sell(params)
      .pipe()
      .subscribe(
        data => {
          this.showAlert('success', 'Tu ticket se ha puesto en venta')
        }, error => {
          this.showAlert('error', error)
        })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}
