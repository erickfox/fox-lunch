import { Component, OnInit } from '@angular/core'
import { SaleService } from '../../services'

@Component({
  selector: 'app-tickets-sale',
  templateUrl: './tickets-sale.component.html',
})
export class TicketsSaleComponent implements OnInit { 

  availableTickets = []

  constructor(private saleService: SaleService) {

  }

  ngOnInit() {
    this.getAvailable()
  }

  getAvailable() {
    this.saleService.available().then(data => {
      this.availableTickets = data.data
    }).catch(error => {
      console.log('getAvailable => ', error.response.data.message)
    })
  }
}
