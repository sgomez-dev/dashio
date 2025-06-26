import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

export interface UserI {
  email: string;
  pass: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  register(user: UserI) {
    return createUserWithEmailAndPassword(this._auth, user.email, user.pass);
  }

  login(user: UserI) {
    return signInWithEmailAndPassword(this._auth, user.email, user.pass);
  }

  logInGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
