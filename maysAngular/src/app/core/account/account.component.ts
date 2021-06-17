import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {confirmPassword} from './confirmPassword';
import {RightService} from '../../service-shared/right.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service-shared/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userInformation: FormGroup;
  avatarForm: FormGroup;
  private fileB64: string;
  isAdmin: boolean;

  constructor(private service: AccountService,
              private fb: FormBuilder,
              private r: RightService,
              private toastr: ToastrService,
              private auth: AuthService) {
    this.userInformation = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: confirmPassword('newPassword', 'confirmPassword')
      });

    this.avatarForm = this.fb.group({
      avatar: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInformation();
    console.log(this.r.isAdmin());
    this.isAdmin = this.r.isAdmin();
  }

  public getInformation(): void {
    this.service.getUserInformation().subscribe(() => {
    }, () => {
      this.toastr.error('Un problème de connexion est survenu');
    });
  }

  public updatePassword(): void {
    const form = this.userInformation.value;
    this.service.updateUserInformation(form).subscribe(() => {
      this.toastr.success('Le mot de passe a été mis à jour');
      this.auth.logout();
    }, () => {
      this.toastr.error('Un problème de connexion est survenu');
    });
  }

  public updateAvatar(): void {
    const isFile = this.avatarForm.value.avatar;
    if (isFile !== null) {
      const content = isFile.match(/([^\\/]+)$/);
      content.shift();
      const name = content[0];
      const form = this.avatarForm.value;
      Object.assign(form, {fileName: name});
      const str = this.fileB64;
      Object.assign(form, {fileContent: str.substring(str.indexOf(',') + 1)});
      this.service.updateUserAvatar(form).subscribe(() => {
        this.toastr.success('Avatar uploadé avec succès !');
        let ext = name.split('.').pop();
        this.r.setAvatar(ext);
      }, () => {
        this.toastr.error('Un problème de connexion est survenu');
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
