import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountComponent} from './account/account.component';
import {AuthGuard} from '../guard/auth.guard';
import {PremiumComponent} from './premium/premium.component';
import {OnePopManComponent} from './pop-components/one-pop-man/one-pop-man.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'one-pop/:id', component: OnePopManComponent},
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'premium',
    component: PremiumComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
