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

  static exchangeUser(id: number): Promise<any> {
    const request = axios.get('/exchange/user/' + id)
    return request
  }
}