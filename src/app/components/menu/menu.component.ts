import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../models'
import { MenuService, ExchangeService } from '../../services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {
  menuList = []
  currentDate = new Date()
  currentUser: User

  constructor(private router: Router, private menuService: MenuService, private exchangeService: ExchangeService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getByDate(this.parseDate(this.currentDate))
  }

  parseDate(date) {
    const typeDate = new Date(date)
    return typeDate.getFullYear() + '-' + (typeDate.getMonth() + 1) + '-' + typeDate.getDate()
  }

  getByDate(date: string) {
    this.menuService.getByDate(date).pipe().subscribe(
      data => {
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
      }, error => {
        console.log('getByDate => ', error)
      })
  }

  exchange(menu) {
    const params = {
      user_id: this.currentUser.id,
      menu_id: menu.id,
      date: menu.date
    }

    this.exchangeService.exchange(params).pipe().subscribe(
      data => {
        this.router.navigate(['/']);
      }, error => {
        console.log('exchange => ', error)
      })
  }
}