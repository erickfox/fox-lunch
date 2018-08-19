import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  @ViewChild('navBar') navBar:ElementRef

  constructor() {
    
  }

  openNav(): void {
    this.navBar.nativeElement.style.width = '280px';
  }

  closeNav(): void {
    this.navBar.nativeElement.style.width = '0';
  }
}