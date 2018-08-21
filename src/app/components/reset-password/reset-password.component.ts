import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NotifierService } from 'angular-notifier'
import { User } from '../../models'


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent implements OnInit {
  currentUser: User
  isFirstLogin: boolean = false

  constructor(
    private router: Router, 
    private notifierService: NotifierService) {
      this.currentUser = JSON.parse(localStorage.getItem('tempUser'));
    }

  ngOnInit() {
    if (this.currentUser)
      this.isFirstLogin = true
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}