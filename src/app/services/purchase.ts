import axios from 'axios'

export class Purchase {
  static purchase(request: any): Promise<any> {
    return axios.post('/purchase', request)
  }
}