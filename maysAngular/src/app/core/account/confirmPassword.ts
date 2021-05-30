import {FormGroup} from '@angular/forms';

export function confirmPassword(password: string, passwordRetype: string): object {
  return (formGroup: FormGroup) => {
    const initialPassword = formGroup.controls[password];
    const matchingPassword = formGroup.controls[passwordRetype];
    if (matchingPassword.errors && !matchingPassword.errors.confirmedValidator) {
      return;
    }
    if (initialPassword.value !== matchingPassword.value) {
      matchingPassword.setErrors({confirmedValidator: true});
    } else {
      matchingPassword.setErrors(null);
    }
  };
}
