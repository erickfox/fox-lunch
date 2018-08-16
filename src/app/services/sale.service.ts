import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class SaleService {
  constructor(private http: HttpClient) { }

  sell(request: any) {
    return this.http.put('/sale', request)
  }

  available() {
    return this.http.get('/sale/available')
  }
}