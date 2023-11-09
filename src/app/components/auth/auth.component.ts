import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { AuthService } from 'src/app/core/services/auth/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loading = false
  session: AuthSession | null | undefined

  // signInForm = this.formBuilder.group({
  //   email: '',
  // })

  constructor(
    private authService: AuthService,
    // private readonly formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.session = await this.authService.getSession()
  }

  async signInWithGoogle() {
    const { data, error } = await this.authService.signInWithGoogle()
    this.authService.getSession()
  }

  async signInWithPassword() {
    const { data, error } = await this.authService.signInWithEmail("chris.marsh@idems.international","G@_F9QLZ5Jp!4kw")
    this.authService.getSession()
  }

  async signOut() {
    await this.authService.signOut()
  }

  // async onSubmit(): Promise<void> {
  //   try {
  //     this.loading = true
  //     const email = this.signInForm.value.email as string
  //     const { error } = await this.supabase.signIn(email)
  //     if (error) throw error
  //     alert('Check your email for the login link!')
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message)
  //     }
  //   } finally {
  //     this.signInForm.reset()
  //     this.loading = false
  //   }
  // }
}