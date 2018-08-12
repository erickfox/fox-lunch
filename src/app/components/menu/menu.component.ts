import { Component, OnInit } from '@angular/core';
import { Menu } from '../../services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {
  
  constructor() {
    
  }

  ngOnInit() {
    this.getByDate(this.getCurrentDate())
  }

  async getByDate(date: string) {
    const response = await Menu.getByDate(date)
  }

  getCurrentDate() {
    const currentDate = new Date()
    const parseDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()

    return parseDate
  }
}