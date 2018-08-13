import axios from 'axios'

export class User {

  static all(): Promise<any> {
    return axios.get('/user')
  }

  static getOne(id): Promise<any> {
    return axios.get('/user/' + id)
  }

  static storeObject(request: any): Promise<any> {
    const req = axios.post('/user', request)
    return req
  }

  static updateObject(request: any): Promise<any> {
    const {
      id
    } = request
    
    return axios.put('/user/' + id, request)
  }

  static deleteObject(id: number): Promise<any> {
    return axios.delete('/user/' + id)
  }

  static auth(request: any): Promise<any> {
    return axios.post('/login', request)
  }
}