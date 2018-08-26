import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app-settings/app-seettings'

@Injectable()
export class PurchaseService {
  constructor(private http: HttpClient) { }

  purchase(request: any) {
    return this.http.post(`${AppSettings.BASE_URL}/purchase`, request)
  }
}