import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'core', loadChildren: () => import('./core/core-routing.module').then(mod => mod.CoreRoutingModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
