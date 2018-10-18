import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sideBar') sideBar: ElementRef

  constructor() { }

  ngOnInit() {
  }

  openNav(): void {
    this.sideBar.nativeElement.style.width = '280px';
  }

  closeNav(): void {
    this.sideBar.nativeElement.style.width = '0';
  }
}
