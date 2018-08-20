import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private router: Router, 
    private notifierService: NotifierService) { }

  ngOnInit() {
    
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}