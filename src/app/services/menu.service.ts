import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../app-settings/app-seettings'
import { Menu } from '../models/menu'

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get(`${AppSettings.BASE_URL}/menus`)
  }

  getOne(id: number) {
    return this.http.get(`${AppSettings.BASE_URL}/menus/${id}`)
  }

  storeObject(request: any) {
    return this.http.post(`${AppSettings.BASE_URL}/menus`, request)
  }

  updateObject(request: any) {
    return this.http.put(`${AppSettings.BASE_URL}/menus/${request.id}`, request)
  }

  deleteObject(id: number) {
    return this.http.delete(`${AppSettings.BASE_URL}/menus/${id}`)
  }

  getByDate(date: string) {
    return this.http.get<[Menu]>(`${AppSettings.BASE_URL}/menus/date/${date}`)
  }
}