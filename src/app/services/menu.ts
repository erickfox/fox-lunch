import axios from 'axios'

export class Menu {
  static all(): Promise<any> {
    return axios.get('/menus')
  }

  static getOne(id: string): Promise<any> {
    return axios.get('/menus/' + id)
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
    return axios.delete('/user/' + id)
  }

  static getByDate(date: string): Promise<any> {
    return axios.get('/menus/date/' + date)
  }
}