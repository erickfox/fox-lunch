import { Component, OnInit } from '@angular/core'
import { Sale } from '../../services'
import { Exchange } from '../../services'

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

  constructor() {

  }

  ngOnInit() {
    this.startTimer()
    this.exchangeUser()
    this.getAvailableTickets()
  }

  getAvailableTickets() {
    Sale.available().then(data => {
      const sortData = data.data.filter(item => item.status === 3)

      this.availableTickets = sortData.length
    }).catch(error => {
      console.log('getAvailableTickets => ', error.response.data.message)
    })
  }

  exchangeUser() {
    // TODO: cambiar 1 por el id original del objeto de usuario
    const params = {
      user_id: 1,
      date: this.parseDate(new Date())
    }
 
    Exchange.exchangeUser(params).then(data => {
      this.reservedMenuView = true
      this.exchange = {
        id: data.data.id,
        menu: {
          name: data.data.Menu.name,
          description: data.data.Menu.description,
          garnish: data.data.Menu.garnish.split(',')
        }
      }
    }).catch(error => {
      console.log('exchangeUser => ', error.response.data.message)
      const currentTime = new Date().getHours()
      this.toReserveView = currentTime < 9 ? true : false
      this.salesView = true
    })
  }

  cancelExchage() {
    if (this.exchange) {
      const params = {
        exchange_id: this.exchange.id
      }

      Exchange.cancel(params).then(data => {
        console.log('Canje cancelado')
        window.location.reload()
      }).catch(error => {
        console.log('cancelExchage => ', error.response.data.message)
      })
    }
  }

  sellTicket() {
    if (this.exchange) {
      const params = {
        exchange_id: this.exchange.id
      }

      Sale.sell(params).then(data => {
        console.log('Ticket vendido')
        window.location.reload()
      }).catch(error => {
        console.log('sellTicket => ', error.response.data.message)
      })
    }
  }

  parseDate(date) {
    const typeDate = new Date(date)
    return typeDate.getFullYear() + '-' + (typeDate.getMonth() + 1) + '-' + typeDate.getDate()
  }

  startTimer() {
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
