import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('navBar') el:ElementRef;
  constructor() {
    
  }

  openNav() {
    this.el.nativeElement.style.width = '280px';
  }

  closeNav() {
    this.el.nativeElement.style.width = '0';
  }
}