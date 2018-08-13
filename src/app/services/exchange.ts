import axios from 'axios'

export class Exchange {
  static exchange(request: any): Promise<any> {
    const req = axios.post('/exchange', request)
    return req
  }

  static cancel(request: any): Promise<any> {
    const req = axios.put('/exchange/cancel', request)
    return req
  }

  static exchangeUser(request: any): Promise<any> {
    const req = axios.post('/exchange/user', request)
    return req
  }
}