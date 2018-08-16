import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ExchangeService {
  constructor(private http: HttpClient) { }

  exchange(request: any) {
    return this.http.post('/exchange', request)
  }

  cancel(request: any) {
    return this.http.put('/exchange/cancel', request)
  }

  exchangeUser(request: any) {
    return this.http.post('/exchange/user', request)
  }
}