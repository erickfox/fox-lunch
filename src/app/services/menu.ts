import axios from 'axios'

export class Menu {

  static async all(): Promise<any> {
    const request = await axios.get('/menus')
    return request
  }
  
  static async getOne(id: string): Promise<any> {
    const request = await axios.get('/menus/' + id)
    return request
  }
  
  static async storeObject(request: any): Promise<any> {
    const {
      name,
      email,
      password,
      isAdmin
    } = request
    const req = await axios.post('/user', request)
    return req
  }
  
  
  static async updateObject(request: any): Promise<any> {
    const {
      id
    } = request
    const req = await axios.put('/user/' + id, request)
    return req
  }
  
  static async deleteObject(id: number): Promise<any> {
    const request = await axios.delete('/user/' + id)
    return request
  }

  static async getByDate(date: string): Promise<any> {
    const request = await axios.get('/menus/date/' + date)
    return request
  }
  
}