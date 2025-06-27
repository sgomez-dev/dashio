import { Component, inject } from '@angular/core';
import {
  RouterModule,
  Router,
  RouterOutlet,
  RouterLink,
} from '@angular/router';

import { NgxSonnerToaster } from 'ngx-sonner';
import { AuthStateService } from '../../shared/data-access/auth-state.service';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  name: string = '';

  ngOnInit() {
    this._authState.authState$.subscribe((user) => {
      if (user) {
        this.name = user.displayName || 'Usuario';
      }
    });
  }

  async logOut() {
    try {
      await this._authState.logOut();
      this._router.navigateByUrl('/auth/login');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
}
