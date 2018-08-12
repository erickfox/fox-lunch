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
  countDownTimer = this.getCurrentDate() + ' 09:00:00'
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
      console.log('Error al obtener los tickets disponibles')
    })
  }

  exchangeUser() {
    // TODO: cambiar 1 por el id original del objeto de usuario
    Exchange.exchangeUser(1).then(data => {
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
      const currentTime = new Date().getHours()
      // this.toReserveView = currentTime <= 9 ? true : false
      this.toReserveView = true
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
        console.log('Error al cancelar canje')
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
        console.log('Error al vender el ticket')
      })
    }
  }


  getCurrentDate() {
    const currentDate = new Date()
    const parseDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()

    return parseDate
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
