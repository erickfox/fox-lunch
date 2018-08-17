import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get('http://127.0.0.1:8080/menus')
  }

  getOne(id: string) {
    return this.http.get('http://127.0.0.1:8080/menus/' + id)
  }

  storeObject(request: any) {
    const {
      name,
      email,
      password,
      isAdmin
    } = request
    const req = this.http.post('http://127.0.0.1:8080/menus', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    const req = this.http.put('http://127.0.0.1:8080/menus/' + id, request)
    return req
  }

  deleteObject(id: number) {
    return this.http.delete('http://127.0.0.1:8080/menus/' + id)
  }

  getByDate(date: string) {
    return this.http.get('http://127.0.0.1:8080/menus/date/' + date)
  }
}