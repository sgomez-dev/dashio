import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';

export interface UserI {
  email: string;
  pass: string;
}

export interface RegisterUserI {
  name: string;
  lastName: string;
  email: string;
  pass: string;
  confPass: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  async register(user: RegisterUserI) {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.pass
    );

    await updateProfile(userCredential.user, {
      displayName: `${user.name}`,
    });

    return userCredential;
  }

  login(user: UserI) {
    return signInWithEmailAndPassword(this._auth, user.email, user.pass);
  }

  logInGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
