import { Component, ElementRef, ViewChild, AfterContentChecked } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements AfterContentChecked {
  @ViewChild('sideBar') sideBar:ElementRef
  sessionActive: boolean = false

  constructor() { }

  ngAfterContentChecked() {
    if (localStorage.getItem('currentUser')) {
      this.sessionActive = true
    } else {
      this.sessionActive = false
    }
  }

  openNav(): void {
    this.sideBar.nativeElement.style.width = '280px';
  }

  closeNav(): void {
    this.sideBar.nativeElement.style.width = '0';
  }
}