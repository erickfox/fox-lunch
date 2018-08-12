import axios from 'axios'

export class Purchase {

  static async purchase(request: any): Promise<any> {
    const req = await axios.post('/purchase', request)
    return req
  }
  
}