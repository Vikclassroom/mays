import { Component, OnInit } from '@angular/core';
import {AccountService} from './account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userInformation: FormGroup;
  avatarForm: FormGroup;
  private fileB64: string;

  constructor(private service: AccountService, private fb: FormBuilder) {
    this.userInformation = this.fb.group({
      username: ['' , Validators.required],
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required]
    });

    this.avatarForm = this.fb.group({
      avatar: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInformation();
  }

  public getInformation(): void {
    this.service.getUserInformation().subscribe();
  }

  public updateInformation(): void {
    const form = this.userInformation;
    this.service.updateUserInformation(form).subscribe();
  }

  public updateAvatar(): void {
    const form = this.avatarForm;
    this.service.updateUserAvatar(form).subscribe();
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
}

/*

popPost(): void {
    if (this.connected) {
      const isFile = this.popPosted.value.fileContent;
      if (isFile !== null) {
        const content = this.popPosted.value.fileContent.match(/([^\\/]+)$/);
        content.shift();
        const name = content[0];
        const form = this.popPosted.value;
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



 */
