import {Component, OnInit} from '@angular/core';
import {PremiumService} from './premium.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {
  creditCard: FormGroup;

  constructor(private premiumService: PremiumService, private fb: FormBuilder, private toastr: ToastrService) {
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

  verifiyStringCard(): string {
    let str = this.creditCard.value.cardNumber;
    str = str.replaceAll(' ', '');
    if (!isNaN(str)) {
      return str;
    }
    return null;
  }

  submit(): void {
    if (this.verifiyStringCard() === null) {
      const cardInfo = this.creditCard.value;
      Object.assign(cardInfo, {cardNumber: this.verifiyStringCard()});
      this.premiumService.subscribe(this.creditCard.value).subscribe(
        () => {
          this.toastr.success('Vous êtes abonné pour une durée d\'un mois');
        },
        () => {
          this.toastr.error('Un problème est survenu');
        });
      window.location.replace('/');
    } else {
      this.toastr.error('les numéros de la carte sont faux');
    }
  }
}
