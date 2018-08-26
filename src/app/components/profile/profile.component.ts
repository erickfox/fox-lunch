import { Component, OnInit } from '@angular/core'
import { User } from '../../models'
import { UserService } from '../../services'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User
  tickets: number = 0
  qrData: string = ''

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.qrData = this.generateString()
  }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo(): void {
    this.userService.getOne(this.currentUser.id)
      .pipe()
      .subscribe(
        data => {
          this.tickets = data.tickets
        },
        error => {
          console.log('getAvailable => ', error)
        })
  }

  generateString(): string {
    let text = this.currentUser.id+','
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < 128; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    text += `,${this.currentUser.name}`

    return text
  }
}
