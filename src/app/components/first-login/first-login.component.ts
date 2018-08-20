import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
})
export class FirstLoginComponent implements OnInit {
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
