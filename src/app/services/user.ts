import axios from 'axios'

export class User {

  static async all(): Promise<any> {
    const request = await axios.get('/user')
    return request
  }
  
  static async getOne(id): Promise<any> {
    const request = await axios.get('/user/' + id)
    return request
  }
  
  static async storeObject(request: any): Promise<any> {
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

  static async auth(request: any): Promise<any> {
    const req = await axios.post('/login', request)
    return req
  }
}