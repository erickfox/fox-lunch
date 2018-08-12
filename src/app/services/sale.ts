import axios from 'axios'

export class Sale {

  static sell(request: any): Promise<any> {
    const req = axios.put('/sale', request)
    return req
  }

  static available(): Promise<any> {
    const req = axios.get('/sale/available')
    return req
  }
  
}