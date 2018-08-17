import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TicketPurchaseByMonth, TicketsSold, User } from '../models'

@Injectable()
export class UserService {
  currentUser: User
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  all() {
    return this.http.get('/user')
  }

  getOne() {
    return this.http.get('/user/' + this.currentUser.id)
  }

  storeObject(request: any) {
    const req = this.http.post('/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    
    return this.http.put('/user/' + this.currentUser.id, request)
  }

  deleteObject() {
    return this.http.delete('/user/' + this.currentUser.id)
  }

  purchaseByMonth() {
    return this.http.get<[TicketPurchaseByMonth]>('/user/'+ this.currentUser.id + '/purchasebymonth')
  }

  ticketsSold() {
    return this.http.get<[TicketsSold]>('/user/'+ this.currentUser.id + '/ticketssold')
  }
}