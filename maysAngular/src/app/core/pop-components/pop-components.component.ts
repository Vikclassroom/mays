import {Component, OnInit} from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {PopService} from './pop.service';
import {AuthService} from '../../service-shared/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pop-components',
  templateUrl: './pop-components.component.html',
  styleUrls: ['./pop-components.component.scss']
})
export class PopComponentsComponent implements OnInit {
  pops: Array<IPop>;
  isAuth: boolean = this.auth.isAuthenticated();
  public contentType: string;

  constructor(private popService: PopService, private auth: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.Pops();
    this.auth.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });

  }

  Pops(): void {
    this.popService.getAllPop().subscribe((pop: Array<IPop>) => {
      this.toastr.success('Chargement réussi');
      this.pops = pop;
    }, () => {
      this.toastr.error('Une erreur est survenu lors du chargement du contenu');
    });
  }
}
