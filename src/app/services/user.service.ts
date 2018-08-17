import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TicketPurchaseByMonth  } from '../models'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get('/user')
  }

  getOne(id) {
    return this.http.get('/user/' + id)
  }

  storeObject(request: any) {
    const req = this.http.post('/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    
    return this.http.put('/user/' + id, request)
  }

  deleteObject(id: number) {
    return this.http.delete('/user/' + id)
  }

  purchaseByMonth(id: number) {
    return this.http.get<[TicketPurchaseByMonth]>('/user/'+ id + '/purchasebymonth')
  }
}