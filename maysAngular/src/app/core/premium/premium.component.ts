import { Component, OnInit } from '@angular/core';
import {PremiumService} from './premium.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {
  creditCard: FormGroup;

  constructor(private premiumService: PremiumService, private fb: FormBuilder) {
    this.creditCard = fb.group({
      cardNumber: [''],
      mount: [0],
      year: [0],
      holder: [''],
      securityCode: [''],
      autoRenew: [true]
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.premiumService.subscribe(this.creditCard.value);
    window.location.replace('/');
  }
}
