import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable()
export class SaleService {
  sell(request: any) {
    return axios.put('/sale', request)
  }

  available() {
    return axios.get('/sale/available')
  }
}