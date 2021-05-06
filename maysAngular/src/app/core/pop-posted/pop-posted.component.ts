import { Component, OnInit } from '@angular/core';
import {CoreService} from '../core.service';
import {AuthService} from '../../guard/auth-service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pop-posted',
  templateUrl: './pop-posted.component.html',
  styleUrls: ['./pop-posted.component.scss']
})
export class PopPostedComponent implements OnInit {
  popPosted: FormGroup;

  constructor(private coreService: CoreService, private auth: AuthService, private fb: FormBuilder) {
    this.popPosted = fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      file: [null]
    });


  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  popPost() {
    const user = this.auth.currentUser$;

    if (user) {
      this.coreService.postPop(this.popPosted.value).subscribe();
    }
  }
}
