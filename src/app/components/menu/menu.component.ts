import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../services'
import { Exchange } from '../../services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {
  menuList = []

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.getByDate(this.getCurrentDate())
  }

  getCurrentDate() {
    const currentDate = new Date()
    const parseDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()

    return parseDate
  }

  getByDate(date: string) {
    Menu.getByDate(date).then(data => {
      data.data.forEach(element => {
        let menuItem: object = {}
        menuItem = {
          id: element.id,
          name: element.name,
          description: element.description,
          garnish: element.garnish.split(',')
        }

        this.menuList.push(menuItem)
      });
    }).catch(error => {
      console.log('Error => ', error)
    })
  }

  exchange(menu) {
    // TODO: cambiar 1 por el id original del objeto de usuario
    const params = {
      user_id: 1,
	    menu_id: menu.id
    }

    Exchange.exchange(params).then(data => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log('Error => ', error)
    })
  }
}