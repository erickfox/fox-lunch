import axios from 'axios'

export class Sale {
  static sell(request: any): Promise<any> {
    return axios.put('/sale', request)
  }

  static available(): Promise<any> {
    return axios.get('/sale/available')
  }
}