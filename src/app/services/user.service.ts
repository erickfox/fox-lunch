import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../app-settings/app-seettings'
import { TicketPurchaseByMonth, TicketsSold, User } from '../models'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get(`${AppSettings.BASE_URL}/user`)
  }

  getOne(id: number) {
    return this.http.get<User>(`${AppSettings.BASE_URL}/user/${id}`)
  }

  storeObject(request: any) {
    return this.http.post(`${AppSettings.BASE_URL}/user`, request)
  }

  updateObject(request: any) {
    return this.http.put(`${AppSettings.BASE_URL}/user/${request.id}`, request)
  }

  deleteObject(id: number) {
    return this.http.delete(`${AppSettings.BASE_URL}/user/${id}`)
  }

  purchaseByMonth(id: number) {
    return this.http.get<[TicketPurchaseByMonth]>(`${AppSettings.BASE_URL}/user/${id}/purchase/bymonth`)
  }

  ticketsSold(id: number) {
    return this.http.get<[TicketsSold]>(`${AppSettings.BASE_URL}/user/${id}/tickets/sold`)
  }
}