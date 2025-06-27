import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export const isRequiredLogin = (field: 'email' | 'pass', form: FormGroup) => {
  const control = form.get(field);
  return !!(control && control.touched && control.hasError('required'));
};

export const isRequiredRegister = (
  field: 'name' | 'lastName' | 'email' | 'pass' | 'confPass',
  form: FormGroup
) => {
  const control = form.get(field);
  return !!(control && control.touched && control.hasError('required'));
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return !!(control && control?.touched && control.hasError('email'));
};

export function passMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('pass')?.value;
  const confirmPassword = control.get('confPass')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
}
