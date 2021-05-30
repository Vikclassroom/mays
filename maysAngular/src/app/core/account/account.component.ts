import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {confirmPassword} from './confirmPassword';

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
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: confirmPassword('password', 'confirmPassword')
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

  public updatePassword(): void {
    const form = this.userInformation;
    this.service.updateUserInformation(form).subscribe();
  }

  public updateAvatar(): void {
    const isFile = this.avatarForm.value.avatar;
    console.log(isFile);
    if (isFile !== null) {
      const content = isFile.match(/([^\\/]+)$/);
      content.shift();
      const name = content[0];
      const form = this.avatarForm.value;
      Object.assign(form, {fileName: name});
      const str = this.fileB64;
      Object.assign(form, {fileContent: str.substring(str.indexOf(',') + 1)});
      console.log(form);
      this.service.updateUserAvatar(form).subscribe((data) => {

      });
    }
  }

  public onTheFly(event): void {
    this.toBase64(event.target.files[0]).then(fileB => {
      this.fileB64 = fileB;
    });
  }

  public toBase64(file): Promise<string> {
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

  }



 */
