import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../../services'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  returnUrl: string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.authenticationService.logout()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get form() {
    return this.loginForm.controls
  }

  login(): void {
    this.spinner.show()
    if (this.loginForm.invalid) {
      this.showAlert('error', 'Debes ingresar valores válidos')
      this.spinner.hide()
      return
    }

    const params = { 
      email: this.form.email.value, 
      password: this.form.password.value
    }

    this.authenticationService.login(params)
      .pipe()
      .subscribe(
        data => {
          this.spinner.hide()
          if (data.firstLogin) {
            this.router.navigate(['/reset-password'])
          } else {
            this.showAlert('success', 'Bienvenido :)')
            this.router.navigate([this.returnUrl])
          }
        },
        error => {
          this.spinner.hide()
          this.showAlert('error', 'Verifica tus credenciales')
        })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
