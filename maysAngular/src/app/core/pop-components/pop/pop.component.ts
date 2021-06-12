import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPop} from '../../../model-interface/pop';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../guard/auth-service/auth.service';
import {PopService} from '../pop.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  @Input() pop: IPop;
  @Input() userName: string;
  @Input() userRole: string;
  blur = true;
  time: string;
  title: string;
  bIsUpdating = false;
  popUpdate: FormGroup;
  private fileB64: string;
  connected: boolean = this.auth.isAuthenticated();
  @Output() readonly InitAfterUpdate = new EventEmitter();
  @Output() readonly InitAfterDelete = new EventEmitter();

  constructor(private auth: AuthService, private popService: PopService, private fb: FormBuilder) {
    this.popUpdate = fb.group({
      title: ['', [Validators.required]],
      content: [''],
      fileContent: [null],
      isSpoiler: [false],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.datePosted();
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
        this.popService.updatePop(this.popUpdate.value.id, form).subscribe(() => {
          this.update();
          this.InitAfterUpdate.emit();
        });
      } else {
        this.popService.updatePop(this.popUpdate.value.id, this.popUpdate.value).subscribe(() => {
          this.update();
          this.InitAfterUpdate.emit();
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
}
