import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../core.service';
import {Router} from '@angular/router';
import {AuthService} from '../../guard/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private core_service: CoreService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  public login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log('L\'utilisateur est connecté');
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
