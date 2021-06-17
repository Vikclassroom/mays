import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service-shared/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RightService} from '../../service-shared/right.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private r: RightService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public register(): void {
    const val = this.form.value;

    if (val.name && val.email && val.password) {
      this.authService.register(val.name, val.email, val.password)
        .subscribe(
          () => {
            this.toastr.success('Votre compte à été créé avec succès');
            this.r.refreshAvatar();
            this.router.navigateByUrl('/');
          },
          () => {
            this.toastr.error('Un problème lors de la création du compte est survenu');
          }
        );
    }
  }

}
