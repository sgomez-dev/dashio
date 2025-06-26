import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GoogleButton } from '../../ui/google-button/google-button';
import { AuthService } from '../../data-access/auth';
import { isRequiredLogin, hasEmailError } from '../../utils/validators';
import { toast } from 'ngx-sonner';

export interface FormLoginI {
  email: FormControl<string | null>;
  pass: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, GoogleButton],
  templateUrl: './login.html',
  styles: ``,
})
export default class Login {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequiredLogin(field: 'email' | 'pass') {
    return isRequiredLogin(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormLoginI>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    pass: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, pass } = this.form.value;

      if (!email || !pass) return;
      await this._authService.login({ email, pass });

      toast.success('Se ha iniciado sesión correctamente');
      this._router.navigate(['/home']);
    } catch (error) {
      toast.error('Error al iniciar sesión');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.logInGoogle();
      toast.success('Se ha iniciado sesión correctamente');
      this._router.navigate(['/home']);
    } catch (error) {
      toast.error('Error al iniciar sesión');
    }
  }
}
