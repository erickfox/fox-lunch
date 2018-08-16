import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable()
export class PurchaseService {
  purchase(request: any) {
    return axios.post('/purchase', request)
  }
}