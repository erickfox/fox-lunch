// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './components/main/app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePurchaseComponent } from './components/profile-purchase/profile-purchase.component';
import { ProfileSalesComponent } from './components/profile-sales/profile-sales.component';
import { TicketsSaleComponent } from './components/tickets-sale/tickets-sale.component';
import { ExchangeComponent } from './components/exchanges/exchange.component';

// Providers
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AuthGuard } from './guards';
import { AuthenticationService, ExchangeService, MenuService, PurchaseService, SaleService, UserService } from './services';

// Libraries
import { NotifierModule } from 'angular-notifier';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: '', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent,canActivate: [AuthGuard] },
  { path: 'exchanges', component: ExchangeComponent,canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'profile-purchase', component: ProfilePurchaseComponent,canActivate: [AuthGuard] },
  { path: 'profile-sales', component: ProfileSalesComponent,canActivate: [AuthGuard] },
  { path: 'ticket-sale', component: TicketsSaleComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    ProfilePurchaseComponent,
    ProfileSalesComponent,
    TicketsSaleComponent,
    ExchangeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left'
        }
      },
      behaviour: {
        autoHide: 3000,
        showDismissButton: false
      }
    }),
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard, 
    AuthenticationService,
    ExchangeService,
    MenuService,
    PurchaseService,
    SaleService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
