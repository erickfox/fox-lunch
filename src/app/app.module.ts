// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePurchaseComponent } from './components/profile-purchase/profile-purchase.component';
import { ProfileSalesComponent } from './components/profile-sales/profile-sales.component';
import { TicketsSaleComponent } from './components/tickets-sale/tickets-sale.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'menu',
    component: MenuComponent 
  },
  {
    path: 'profile',
    component: ProfileComponent 
  },
  {
    path: 'profile-purchase',
    component: ProfilePurchaseComponent 
  },
  {
    path: 'profile-sales',
    component: ProfileSalesComponent 
  },
  {
    path: 'ticket-sale',
    component: TicketsSaleComponent 
  }
];

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
    HttpModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
