import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { ExchangeService, SaleService } from '../../services'
import { NotifierService } from 'angular-notifier'
import { User } from '../../models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  toReserveView: boolean = false
  salesView: boolean = false
  reservedMenuView: boolean = false
  availableTickets: number = 0
  exchange = null
  currentDate = new Date()
  countDownTimer = this.parseDate(this.currentDate) + ' 19:00:00'
  hours = 0
  minutes = 0
  seconds = 0
  currentUser: User

  constructor(private router: Router, private exchangeService: ExchangeService, private saleService: SaleService, private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.startTimer()
    this.exchangeUser()
    this.getAvailableTickets()
  }

  getAvailableTickets(): void {
    this.saleService.available()
      .pipe()
      .subscribe(
        data => {
          const sortData = data.filter(item => (item.status === 3 && item.UserId !== this.currentUser.id))
          this.availableTickets = sortData.length
        },
        error => {
          console.log('saleService => ', error)
        })
  }

  exchangeUser(): void {
    const params = {
      user_id: this.currentUser.id,
      date: this.parseDate(new Date())
    }

    this.exchangeService.exchangeUser(params)
      .pipe()
      .subscribe(
        data => {
          this.reservedMenuView = true
          this.exchange = {
            id: data.id,
            menu: {
              name: data.Menu.name,
              description: data.Menu.description,
              garnish: data.Menu.garnish.split(',')
            }
          }
        },
        error => {
          console.log('exchangeUser => ', error)
          const currentTime = new Date().getHours()
          this.toReserveView = currentTime < 19 ? true : false
          this.salesView = true
          this.reservedMenuView = false
        })
  }

  cancelExchage(): void {
    if (this.exchange) {
      const params = {
        exchange_id: this.exchange.id
      }

      this.exchangeService.cancel(params)
        .pipe()
        .subscribe(
          data => {
            this.showAlert('success', 'Tu canje ha sido cancelado')
            this.onRefresh()
          },
          error => {
            this.showAlert('error', error)
          })
    }
  }

  sellTicket(): void {
    if (this.exchange) {
      const params = {
        exchange_id: this.exchange.id
      }

      this.saleService.sell(params)
        .pipe()
        .subscribe(
          data => {
            this.showAlert('success', 'Tu ticket se ha puesto en venta')
            this.onRefresh()
          }, error => {
            this.showAlert('error', error)
          })
    }
  }

  onRefresh() {
    this.exchangeUser()
    this.getAvailableTickets()
  }

  parseDate(date): string {
    const typeDate = new Date(date)
    let month: number = typeDate.getMonth() + 1
    let parseMonth: string = ''

    if (month < 10) {
      parseMonth = '0' + month
    }

    return typeDate.getFullYear() + '-' + parseMonth + '-' + typeDate.getDate()
  }

  startTimer(): void {
    const limitDateTime = new Date(this.countDownTimer).getTime()

    setInterval(() => {
      const currentDateTime = new Date().getTime()
      const distance = limitDateTime - currentDateTime

      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        this.toReserveView = false
      }
    }, 1000)
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}
