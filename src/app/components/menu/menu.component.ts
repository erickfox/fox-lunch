import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User, Menu } from '../../models'
import { MenuService, ExchangeService } from '../../services'
import { NotifierService } from 'angular-notifier'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {
  menuList = []
  currentDate = new Date()
  currentUser: User
  menuSelected: Menu = null
  modalIsOpen: boolean = false
  errorMessage: string = ''

  constructor(private router: Router, private menuService: MenuService, private exchangeService: ExchangeService, private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.getByDate(this.parseDate(this.currentDate))
  }

  openModal(menu: Menu): void {
    this.menuSelected = menu
    this.modalIsOpen = true
  }

  closeModal(): void {
    this.menuSelected = null
    this.modalIsOpen = false
  }

  parseDate(date): string {
    const typeDate = new Date(date)
    return typeDate.getFullYear() + '-' + (typeDate.getMonth() + 1) + '-' + typeDate.getDate()
  }

  getByDate(date: string): void {
    this.menuService.getByDate(date)
      .pipe()
      .subscribe(
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
          })
        },
        error => {
          console.log('getByDate => ', error)
        })
  }

  exchange(menu): void {
    const params = {
      user_id: this.currentUser.id,
      menu_id: menu.id,
      date: menu.date
    }

    this.exchangeService.exchange(params)
      .pipe()
      .subscribe(
        data => {
          this.closeModal()
          this.router.navigate(['/'])
        },
        error => {
          this.menuSelected = null
          this.errorMessage = error
        })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}