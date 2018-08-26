import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotifierService } from 'angular-notifier'
import { User } from '../../models'
import { AuthenticationService } from '../../services'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent implements OnInit {
  currentUser: User
  isFirstLogin: boolean = false
  resetPasswordForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notifierService: NotifierService) {
    this.currentUser = JSON.parse(localStorage.getItem('tempUser'))
  }

  ngOnInit() {
    if (this.currentUser)
      this.isFirstLogin = true

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  get form() {
    return this.resetPasswordForm.controls
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.showAlert('error', 'Debes ingresar valores válidos')
      return
    }

    if (this.form.password.value === this.form.confirmPassword.value) {
      const params = {
        id: this.currentUser.id,
        password: this.form.password.value
      }

      this.authService.resetPassword(params)
        .pipe()
        .subscribe(
          data => {
            this.showAlert('success', 'Contraseña actualizada correctamente')
            this.router.navigate(['/login'])
          },
          error => {
            console.log(error)
            this.showAlert('error', error)
          })
    } else {
      this.showAlert('error', 'Las contraeñas ingresadas no coinciden')
    }
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}