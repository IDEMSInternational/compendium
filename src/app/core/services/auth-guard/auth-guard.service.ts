import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate() {
    await this.auth.getSession()
    if (!this.auth.user$.value) {
      this.router.navigate(["sign-in"])
      return false
    }
    return true
  }
}
