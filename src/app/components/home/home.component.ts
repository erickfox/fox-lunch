import { Component, OnInit } from '@angular/core'
import { ExchangeService, SaleService, AuthenticationService } from '../../services'
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
  countDownTimer = this.parseDate(this.currentDate) + ' 09:00:00'
  hours = 0
  minutes = 0
  seconds = 0
  currentUser: User

  constructor(private exchangeService: ExchangeService, private saleService: SaleService, private authService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
          this.toReserveView = currentTime < 9 ? true : false
          this.salesView = true
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
            console.log('Canje cancelado => ', data)
            window.location.reload()
          },
          error => {
            console.log('cancelExchage => ', error)
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
            console.log('Ticket vendido => ', data)
            window.location.reload()
          }, error => {
            console.log('sellTicket => ', error.response.data.message)
          })
    }
  }

  parseDate(date): string {
    const typeDate = new Date(date)
    return typeDate.getFullYear() + '-' + (typeDate.getMonth() + 1) + '-' + typeDate.getDate()
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
}
