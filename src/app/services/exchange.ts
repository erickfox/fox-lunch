import axios from 'axios'

export class Exchange {

  static async exchange(request: any): Promise<any> {
    const req = await axios.post('/exchange', request)
    return req
  }

  static async cancel(request: any): Promise<any> {
    const req = await axios.post('/exchange/cancel', request)
    return req
  }

}