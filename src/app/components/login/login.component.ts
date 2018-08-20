import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../../services'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  returnUrl: string
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get form() {
    return this.loginForm.controls
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.showAlert('error', 'Debes ingresar valores válidos')
      return
    }

    this.loading = true;
    this.authenticationService.login(this.form.email.value, this.form.password.value)
      .pipe()
      .subscribe(
        data => {
          if (data.firstLogin)
            this.router.navigate(['/reset-password']);
          else {
            this.showAlert('success', 'Bienvenido :)')
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          this.showAlert('error', 'Verifica tus credenciales')
          this.loading = false;
        })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}
