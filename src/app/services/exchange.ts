import axios from 'axios'

export class Exchange {
  static exchange(request: any): Promise<any> {
    return axios.post('/exchange', request)
  }

  static cancel(request: any): Promise<any> {
    return axios.put('/exchange/cancel', request)
  }

  static exchangeUser(request: any): Promise<any> {
    return axios.post('/exchange/user', request)
  }
}