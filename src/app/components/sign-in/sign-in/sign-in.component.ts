import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

  async signInWithGoogle() {
    return await this.authService.login()
  }

  async signOut() {
    return await this.authService.logout()
  }
}
