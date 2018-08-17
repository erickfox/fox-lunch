import { Component, OnInit } from '@angular/core'
import { AvailableTickets } from '../../models'
import { SaleService } from '../../services'

@Component({
  selector: 'app-tickets-sale',
  templateUrl: './tickets-sale.component.html',
})
export class TicketsSaleComponent implements OnInit { 
  availableTickets: AvailableTickets[] = [];

  constructor(private saleService: SaleService) {

  }

  ngOnInit() {
    this.getAvailable()
  }

  getAvailable() {
    this.saleService.available().toPromise().then(data => {
      this.availableTickets = data
    }).catch(error => {
      console.log('getAvailable => ', error)
    })
  }
}
