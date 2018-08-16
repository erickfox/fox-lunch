import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable()
export class UserService {
  all() {
    return axios.get('/user')
  }

  getOne(id) {
    return axios.get('/user/' + id)
  }

  storeObject(request: any) {
    const req = axios.post('/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    
    return axios.put('/user/' + id, request)
  }

  deleteObject(id: number) {
    return axios.delete('/user/' + id)
  }

  auth(request: any) {
    return axios.post('/login', request)
  }
}