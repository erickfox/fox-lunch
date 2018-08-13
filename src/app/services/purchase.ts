import axios from 'axios'

export class Purchase {

  static purchase(request: any): Promise<any> {
    const req = axios.post('/purchase', request)
    return req
  }

}