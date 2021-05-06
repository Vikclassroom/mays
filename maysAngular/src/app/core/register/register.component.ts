import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../guard/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  public register() {
    const val = this.form.value;

    if (val.name && val.email && val.password) {
      this.authService.register(val.name, val.email, val.password)
        .subscribe(
          () => {
            console.log('L\'utilisateur est enregistré et connecté');
            this.router.navigateByUrl('/');
          }
        );
    }
  }

}
