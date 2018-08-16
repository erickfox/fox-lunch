import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable()
export class ExchangeService {
  exchange(request: any) {
    return axios.post('/exchange', request)
  }

  cancel(request: any) {
    return axios.put('/exchange/cancel', request)
  }

  exchangeUser(request: any) {
    return axios.post('/exchange/user', request)
  }
}