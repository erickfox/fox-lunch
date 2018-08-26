import { Component, OnInit } from '@angular/core'
import { ExchangeService, SaleService } from '../../services'
import { NotifierService } from 'angular-notifier'
import { User } from '../../models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  purchaseView: boolean = false
  countDownView: boolean = false
  alreadyExchange: boolean = false
  availableTickets: number = 0
  currentDate = new Date()
  countDownTimer = this.parseDate(this.currentDate) + ' 19:00:00'
  hours = 0
  minutes = 0
  seconds = 0
  currentUser: User

  constructor(private exchangeService: ExchangeService, private saleService: SaleService, private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.exchangeUser()
    this.startTimer()
    this.getAvailableTickets()
    this.checkHour()
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

        })
  }

  exchangeUser(): void {
    const localDate = this.currentDate.setDate(this.currentDate.getDate() + 1)
    const params = {
      user_id: this.currentUser.id,
      date: this.parseDate(localDate)
    }

    this.exchangeService.exchangeUser(params)
      .pipe()
      .subscribe(
        data => {
          this.alreadyExchange = true
        },
        error => {
          this.alreadyExchange = false
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
          this.onRefresh()
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
          this.onRefresh()
        }, error => {
          this.showAlert('error', error)
        })
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

  checkHour(): void {
    const currentTime = new Date()
    if (currentTime.getHours() < 19) {
      this.purchaseView = true
      this.countDownView = true
    } else {
      this.purchaseView = false
      this.countDownView = false
    }
  }

  startTimer(): void {
    const limitDateTime = new Date(this.countDownTimer).getTime()

    setInterval(() => {
      const currentDateTime = new Date().getTime()
      const distance = limitDateTime - currentDateTime

      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0)
        this.checkHour()
    }, 1000)
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}
