import axios from 'axios'

export class Sale {

  static async sell(request: any): Promise<any> {
    const req = await axios.post('/sale', request)
    return req
  }

  static async available(): Promise<any> {
    const req = await axios.get('/sale/available')
    return req
  }
  
}