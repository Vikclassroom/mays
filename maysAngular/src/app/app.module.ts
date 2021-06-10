import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './Interceptors/jwt.interceptor';
import { RegisterComponent } from './core/register/register.component';
import { PopComponent } from './core/pop-components/pop/pop.component';
import { PopPostedComponent } from './core/pop-components/pop-posted/pop-posted.component';
import { CommentsComponent } from './core/pop-components/comments/comments.component';
import { LikeComponent } from './core/pop-components/pop/like/like.component';
import { PopComponentsComponent } from './core/pop-components/pop-components.component';
import { AccountComponent } from './core/account/account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddCommentComponent } from './core/pop-components/add-comment/add-comment.component';
import { PremiumComponent } from './core/premium/premium.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PopComponent,
    PopPostedComponent,
    CommentsComponent,
    LikeComponent,
    PopComponentsComponent,
    AccountComponent,
    NavBarComponent,
    AddCommentComponent,
    PremiumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
