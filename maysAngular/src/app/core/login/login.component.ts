import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../guard/auth-service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {

    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public login(): void {
    const val = this.form.value;

    if (val.login && val.password) {
      this.authService.login(val.login, val.password)
        .subscribe(
          () => {
            this.toastr.success('Succès à la connexion');
            this.router.navigateByUrl('/');
          },
          () => {
            this.toastr.error('Erreur de connexion');
          }
        );
    }
    this.toastr.error('Une erreur de mot de passe ou d\'utilisateur est en cause');
  }
}
