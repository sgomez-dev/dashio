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
import { isRequiredRegister, hasEmailError } from '../../utils/validators';
import { toast } from 'ngx-sonner';

interface FormRegisterI {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  pass: FormControl<string | null>;
  confPass: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, GoogleButton],
  templateUrl: './register.html',
  styles: ``,
})
export default class Register {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequiredRegister(
    field: 'name' | 'lastName' | 'email' | 'pass' | 'confPass'
  ) {
    return isRequiredRegister(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormRegisterI>({
    name: this._formBuilder.control('', Validators.required),
    lastName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    pass: this._formBuilder.control('', Validators.required),
    confPass: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { name, lastName, email, pass, confPass } = this.form.value;

      if (!name || !lastName || !email || !pass || !confPass) return;
      await this._authService.register({ email, pass });

      console.log(this.form.value);
      toast.success('Se ha registrado correctamente');
      this._router.navigate(['/home']);
    } catch (error) {
      toast.error('Error al registrarse');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.logInGoogle();
      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/home');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
}
