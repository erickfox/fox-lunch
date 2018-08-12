import axios from 'axios'

export class Menu {

  static all(): Promise<any> {
    const request = axios.get('/menus')
    return request
  }

  static getOne(id: string): Promise<any> {
    const request = axios.get('/menus/' + id)
    return request
  }

  static storeObject(request: any): Promise<any> {
    const {
      name,
      email,
      password,
      isAdmin
    } = request
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

  static getByDate(date: string): Promise<any> {
    const request = axios.get('/menus/date/' + date)
    return request
  }

}