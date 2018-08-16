import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get('/menus')
  }

  getOne(id: string) {
    return this.http.get('/menus/' + id)
  }

  storeObject(request: any) {
    const {
      name,
      email,
      password,
      isAdmin
    } = request
    const req = this.http.post('/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    const req = this.http.put('/user/' + id, request)
    return req
  }

  deleteObject(id: number) {
    return this.http.delete('/user/' + id)
  }

  getByDate(date: string) {
    return this.http.get('/menus/date/' + date)
  }
}