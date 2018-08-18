// Dependencies
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

// Components
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { MenuComponent } from './components/menu/menu.component'
import { ProfileComponent } from './components/profile/profile.component'
import { ProfilePurchaseComponent } from './components/profile-purchase/profile-purchase.component'
import { ProfileSalesComponent } from './components/profile-sales/profile-sales.component'
import { TicketsSaleComponent } from './components/tickets-sale/tickets-sale.component'

// Providers
import { JwtInterceptor, ErrorInterceptor, BaseUrlInterceptor } from './helpers'
import { AuthGuard } from './guards'
import { AuthenticationService, ExchangeService, MenuService, PurchaseService, SaleService, UserService } from './services'

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-purchase',
    component: ProfilePurchaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-sales',
    component: ProfileSalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ticket-sale',
    component: TicketsSaleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    ProfilePurchaseComponent,
    ProfileSalesComponent,
    TicketsSaleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
