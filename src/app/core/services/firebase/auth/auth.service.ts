import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, signOut, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ = new BehaviorSubject<User | null>(null);

  constructor(public auth: Auth) {
    this.init()
  }

  init() {
    this.auth.onAuthStateChanged(user => {
      console.log("user:", user)
      this.user$.next(user)
    })
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    return await signOut(this.auth);
  }
}
