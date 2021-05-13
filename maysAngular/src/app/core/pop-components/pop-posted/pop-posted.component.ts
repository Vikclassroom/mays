import {Component, OnInit} from '@angular/core';
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
  connected: boolean;
  fileB64: string;

  constructor(private popService: PopService, private auth: AuthService, private fb: FormBuilder) {
    this.popPosted = fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      fileContent: [null],
      isSpoiler: [false]
    });


  }

  ngOnInit(): void {
    if (this.auth.currentUser$ != null) {
      this.connected = true;
    }
  }

  popPost(): void {
    const user = this.auth.isAuthenticated;

    if (user) {

      const content = this.popPosted.value.fileContent.match(/([^\\/]+)$/);
      content.shift();
      const name = content[0];
      const form = this.popPosted.value;
      Object.assign(form, {fileName: name});
      form.fileContent = this.fileB64;
      this.popService.postPop(form).subscribe((data) => {
        console.log(this.popPosted);
      });
    }
  }

  onTheFly(event): void {
    console.log(event);
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
}
