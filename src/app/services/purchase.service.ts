import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PurchaseService {
  constructor(private http: HttpClient) { }

  purchase(request: any) {
    return this.http.post('/purchase', request)
  }
}