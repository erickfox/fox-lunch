import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AvailableTickets } from '../models/available-tickets'
import { Exchange } from '../models/exchange'

@Injectable()
export class SaleService {
  constructor(private http: HttpClient) { }

  sell(request: any) {
    return this.http.put<Exchange>('http://127.0.0.1:8080/sale', request)
  }

  available() {
    return this.http.get<[AvailableTickets]>('http://127.0.0.1:8080/sale/available')
  }
}