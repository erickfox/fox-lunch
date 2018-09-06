import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../app-settings/app-settings'
import { Exchange } from '../models/exchange'

@Injectable()
export class ExchangeService {
  constructor(private http: HttpClient) { }

  exchange(request: any) {
    return this.http.post<Exchange>(`${AppSettings.BASE_URL}/exchange`, request)
  }

  cancel(request: any) {
    return this.http.put<Exchange>(`${AppSettings.BASE_URL}/exchange/cancel`, request)
  }

  exchangeUser(request: any) {
    return this.http.post<Exchange>(`${AppSettings.BASE_URL}/exchange/user`, request)
  }

  exchangesUser(id: number) {
    return this.http.get<[Exchange]>(`${AppSettings.BASE_URL}/exchanges/user/${id}`)
  }
}