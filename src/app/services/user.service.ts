import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  all() {
    return this.http.get('http://127.0.0.1:8080/user')
  }

  getOne(id) {
    return this.http.get('http://127.0.0.1:8080/user/' + id)
  }

  storeObject(request: any) {
    const req = this.http.post('http://127.0.0.1:8080/user', request)
    return req
  }

  updateObject(request: any) {
    const {
      id
    } = request
    
    return this.http.put('http://127.0.0.1:8080/user/' + id, request)
  }

  deleteObject(id: number) {
    return this.http.delete('http://127.0.0.1:8080/user/' + id)
  }
}