import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, ExchangeService } from '../../services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {
  menuList = []
  currentDate = new Date()

  constructor(private router: Router, private menuService: MenuService, private exchangeService: ExchangeService) {

  }

  ngOnInit() {
    this.getByDate(this.parseDate(this.currentDate))
  }

  parseDate(date) {
    const typeDate = new Date(date)
    return typeDate.getFullYear() + '-' + (typeDate.getMonth() + 1) + '-' + typeDate.getDate()
  }

  getByDate(date: string) {
    this.menuService.getByDate(date).toPromise().then(data => {
      data.forEach(element => {
        let menuItem: object = {}
        menuItem = {
          id: element.id,
          date: element.date,
          name: element.name,
          description: element.description,
          garnish: element.garnish.split(',')
        }

        this.menuList.push(menuItem)
      });
    }).catch(error => {
      console.log('getByDate => ', error)
    })
  }

  exchange(menu) {
    // TODO: cambiar 1 por el id original del objeto de usuario
    const params = {
      user_id: 1,
      menu_id: menu.id,
      date: menu.date
    }

    this.exchangeService.exchange(params).toPromise().then(data => {
      this.router.navigate(['/']);
    }).catch(error => {
      console.log('exchange => ', error)
    })
  }
}