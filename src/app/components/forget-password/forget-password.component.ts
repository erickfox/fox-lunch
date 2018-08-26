import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NotifierService } from 'angular-notifier'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private notifierService: NotifierService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  get form() {
    return this.forgetPasswordForm.controls
  }

  forgetPasword(): void {
    if (this.forgetPasswordForm.invalid) {
      this.showAlert('error', 'Debes ingresar valores válidos')
      return
    }

    const params = {
      email: this.form.email.value
    }

    this.authService.forgetPassword(params)
      .pipe()
      .subscribe(
        data => {
          this.showAlert('success', 'Revisa tu correo, ha sido enviada una nueva contraseña')
          this.router.navigate(['/login'])
        },
        error => {
          this.showAlert('error', error)
        }
      )
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
