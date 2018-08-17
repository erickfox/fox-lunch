import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Exchange } from '../models/exchange'

@Injectable()
export class ExchangeService {
  constructor(private http: HttpClient) { }

  exchange(request: any) {
    return this.http.post<Exchange>('/exchange', request)
  }

  cancel(request: any) {
    return this.http.put<Exchange>('/exchange/cancel', request)
  }

  exchangeUser(request: any) {
    return this.http.post<Exchange>('/exchange/user', request)
  }
}