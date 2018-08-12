import { Component, OnInit } from '@angular/core';
import { Sale } from '../../services'
import { Exchange } from '../../services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  navigationSubscription
  toReserveView: boolean = false
  salesView: boolean = false
  reservedMenuView: boolean = false
  availableTickets: number = 0
  exchange = null

  constructor() {
    
  } 

  ngOnInit() {
    this.exchangeUser()
    this.getAvailableTickets()
  }

  getAvailableTickets() {
    Sale.available().then(data => {
      this.availableTickets = data.data.length
    }).catch(error => {
      console.log('Error al obtener los tickets disponibles')
    })
  }

  exchangeUser() {
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
        if (data) {
          console.log('Canje cancelado')
          window.location.reload()
        }
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
        if (data) {
          console.log('Ticket vendido')
          window.location.reload()
        }
      }).catch(error => {
        console.log('Error al vender el ticket')
      })
    }
  }
}
