import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../guard/auth-service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopService} from '../pop.service';

@Component({
  selector: 'app-pop-posted',
  templateUrl: './pop-posted.component.html',
  styleUrls: ['./pop-posted.component.scss']
})
export class PopPostedComponent implements OnInit {
  popPosted: FormGroup;
  connected: boolean = this.auth.isAuthenticated();
  @Output() readonly InitAfterPost = new EventEmitter();
  private fileB64: string;

  constructor(private popService: PopService, private auth: AuthService, private fb: FormBuilder) {
    this.popPosted = fb.group({
      title: ['', [Validators.required]],
      content: [''],
      fileContent: [null],
      isSpoiler: [false]
    });
  }

  ngOnInit(): void {
  }

  popPost(): void {
    if (this.connected) {
      const isFile = this.popPosted.value.fileContent;
      console.log(isFile);
      if (isFile !== null) {
        const content = this.popPosted.value.fileContent.match(/([^\\/]+)$/);
        content.shift();
        const name = content[0];
        console.log(name);
        const form = this.popPosted.value;
        console.log(form);
        Object.assign(form, {fileName: name});
        const str = this.fileB64;
        form.fileContent = str.substring(str.indexOf(',') + 1);
        this.popService.postPop(form).subscribe((data) => {
          this.InitAfterPost.emit();
        });
      } else {
        this.popService.postPop(this.popPosted.value).subscribe((data) => {
          this.InitAfterPost.emit();
        });
      }
    }
  }

  onTheFly(event): void {
    this.toBase64(event.target.files[0]).then(fileB => {
      this.fileB64 = fileB;
    });
  }

  toBase64(file): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  closeCollapse(): void {
    document.getElementById('collapse').click();
  }
}
