import { Component } from '@angular/core';
import { Menu } from '../../services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  constructor() {
    this.getByDate()
  }

  async getByDate() {
    const response = await Menu.getByDate('2018-08-12')
    console.log(response)
  }
}
