import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable()
export class MenuService {
  all() {
    return axios.get('/menus')
  }

  getOne(id: string) {
    return axios.get('/menus/' + id)
  }

  storeObject(request: any) {
    const {
      name,
      email,
      password,
      isAdmin
    } = request
    const req = axios.post('/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    const req = axios.put('/user/' + id, request)
    return req
  }

  deleteObject(id: number) {
    return axios.delete('/user/' + id)
  }

  getByDate(date: string) {
    return axios.get('/menus/date/' + date)
  }
}