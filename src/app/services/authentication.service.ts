import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { User } from '../models'

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(params) {
    return this.http.post<User>('/login', params)
      .pipe(map(user => {
        if (user && user.token) {
          if (user.firstLogin) {
            localStorage.setItem('tempUser', JSON.stringify(user))
          } else {
            localStorage.setItem('currentUser', JSON.stringify(user))
          }
        }

        return user
      }))
  }

  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('tempUser')
  }

  resetPassword(params) {
    return this.http.post('/user/' + params.id + '/password', params)
  }
}