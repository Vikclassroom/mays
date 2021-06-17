import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPop} from '../../../model-interface/pop';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../guard/auth-service/auth.service';
import {PopService} from '../pop.service';
import {RightService} from '../right.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  @Input() pop: IPop;
  userName: string;
  blur = true;
  time: string;
  title: string;
  bIsUpdating = false;
  popUpdate: FormGroup;
  private fileB64: string;
  connected: boolean = this.auth.isAuthenticated();
  @Output() readonly InitAfterUpdate = new EventEmitter();
  @Output() readonly InitAfterDelete = new EventEmitter();

  constructor(private auth: AuthService,
              private popService: PopService,
              private fb: FormBuilder,
              private r: RightService,
              private toastr: ToastrService) {
    this.popUpdate = fb.group({
      title: ['', [Validators.required]],
      content: [''],
      fileContent: [null],
      isSpoiler: [false]
    });
  }

  ngOnInit(): void {
    this.datePosted();
    this.userName = this.r.getRight().userName;
    this.auth.isAuth$.subscribe((data) => {
        if (data) {
          this.userName = this.r.getRight().userName;
        } else {
          this.userName = '';
        }
      },
      () => {
        this.toastr.error('Une erreur de chargement est survenu');
      });
  }

  onShow(): void {
    this.blur = false;
  }

  datePosted(): void {
    moment.locale('fr');
    const time = moment(this.pop.date);
    this.time = time.fromNow();
    this.title = time.format('DD.MM.YYYY HH:mm:ss');
  }

  update(): void {
    this.bIsUpdating = !this.bIsUpdating;
    this.popUpdate.patchValue({
      title: this.pop.title,
      content: this.pop.content,
      isSpoiler: this.pop.isSpoiler,
      id: this.pop.id
    });
  }

  deletePost(): void {
    this.popService.deletePop(this.pop.id).subscribe(() => {
      this.toastr.success('La suppression de la pop est une réussite !!');
      this.InitAfterDelete.emit();
    }, () => {
      this.toastr.error('une erreur est survenu lors de la suppression du post');
    });
  }

  // cette dupplication de code aurait pu être l'oeuvre d'un service à part entière
  updatePost(): void {
    if (this.connected) {
      const isFile = this.popUpdate.value.fileContent;
      if (isFile !== null) {
        // cette dupplication de code aurait pu être l'oeuvre d'un helper
        const content = this.popUpdate.value.fileContent.match(/([^\\/]+)$/);
        content.shift();
        const name = content[0];
        const form = this.popUpdate.value;
        Object.assign(form, {fileName: name});
        const str = this.fileB64;
        form.fileContent = str.substring(str.indexOf(',') + 1);
        this.popService.updatePop(this.pop.id, form).subscribe(() => {
          this.toastr.success('La mise à jour à été un succès');
          this.update();
          this.InitAfterUpdate.emit();
        }, () => {
          this.toastr.error('une erreur est survenu lors de la mise à jour');
        });
      } else {
        this.popService.updatePop(this.pop.id, this.popUpdate.value).subscribe(() => {
          this.toastr.success('La mise à jour à été un succès');
          this.update();
          this.InitAfterUpdate.emit();
        }, () => {
          this.toastr.error('une erreur est survenu lors de la mise à jour');
        });
      }
    }
  }

  // cette dupplication de code aurait pu être l'oeuvre d'un service à part entière
  onTheFly(event): void {
    this.toBase64(event.target.files[0]).then(fileB => {
      this.fileB64 = fileB;
    });
  }

  // cette dupplication de code aurait pu être l'oeuvre d'un service à part entière

  toBase64(file): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  isAdmin(): boolean {
    return this.r.isAdmin();
  }

  isPremium(): boolean {
    return this.r.isPremium();
  }
}
