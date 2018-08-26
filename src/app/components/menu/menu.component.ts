import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User, Menu } from '../../models'
import { MenuService, ExchangeService } from '../../services'
import { NotifierService } from 'angular-notifier'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {
  menuList = []
  checkDate: Date = new Date()
  currentDate = new Date()
  currentUser: User
  parseCurrentDate: string
  menuSelected: Menu = null
  modalIsOpen: boolean = false
  disableOption: boolean = false

  constructor(private router: Router, private menuService: MenuService, private exchangeService: ExchangeService, private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    this.currentDate.setDate(this.currentDate.getDate() + 1)
    this.parseCurrentDate = this.parseDate(this.currentDate)
    this.getByDate(this.parseCurrentDate)
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
    let month: number = typeDate.getMonth() + 1
    let parseMonth: string = ''

    if (month < 10) {
      parseMonth = '0' + month
    }

    return typeDate.getFullYear() + '-' + parseMonth + '-' + typeDate.getDate()
  }

  getByDate(date: string): void {
    this.menuList = []
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
          this.showAlert('success', 'Tu menú seleccionado ha sido reservado')
          this.router.navigate(['/'])
        },
        error => {
          this.menuSelected = null
          this.closeModal()
          this.showAlert('error', error)
        })
  }

  addDay(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1)
    this.parseCurrentDate = this.parseDate(this.currentDate)
    this.getByDate(this.parseCurrentDate)
    this.disableOption = this.checkDate.getTime() >= this.currentDate.getTime() ? true : false
  }

  subtractDay(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 1)
    this.parseCurrentDate = this.parseDate(this.currentDate)
    this.getByDate(this.parseCurrentDate)
    this.disableOption = this.checkDate.getTime() >= this.currentDate.getTime() ? true : false
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}