import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../app-settings/app-seettings'
import { AvailableTickets } from '../models/available-tickets'
import { Exchange } from '../models/exchange'

@Injectable()
export class SaleService {
  constructor(private http: HttpClient) { }

  sell(request: any) {
    return this.http.put<Exchange>(`${AppSettings.BASE_URL}/sale`, request)
  }

  available() {
    return this.http.get<[AvailableTickets]>(`${AppSettings.BASE_URL}/sale/available`)
  }
}