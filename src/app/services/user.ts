import axios from 'axios'

export class User {

  static all(): Promise<any> {
    const request = axios.get('/user')
    return request
  }

  static getOne(id): Promise<any> {
    const request = axios.get('/user/' + id)
    return request
  }

  static storeObject(request: any): Promise<any> {
    const req = axios.post('/user', request)
    return req
  }

  static updateObject(request: any): Promise<any> {
    const {
      id
    } = request
    const req = axios.put('/user/' + id, request)
    return req
  }

  static deleteObject(id: number): Promise<any> {
    const request = axios.delete('/user/' + id)
    return request
  }

  static auth(request: any): Promise<any> {
    const req = axios.post('/login', request)
    return req
  }
}