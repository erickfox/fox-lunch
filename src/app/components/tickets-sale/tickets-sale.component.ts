import { Component, OnInit } from '@angular/core'
import { Sale } from '../../services'

@Component({
  selector: 'app-tickets-sale',
  templateUrl: './tickets-sale.component.html',
})
export class TicketsSaleComponent implements OnInit { 

  availableTickets = []

  constructor() {

  }

  ngOnInit() {
    this.getAvailable()
  }

  getAvailable() {
    Sale.available().then(data => {
      this.availableTickets = data.data
    }).catch(error => {

    })
  }
}
