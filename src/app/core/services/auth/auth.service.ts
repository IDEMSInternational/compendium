import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from 'src/app/shared/models/database.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient<Database>

  session: AuthSession | null = null
  public user$ = new BehaviorSubject<User | null | undefined>(null);

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase
    this.init()
  }

  init() {
    this.getSession()
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.user$.next(session.user)
      }
    })
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession()
    if (data) {
      this.session = data.session
      this.user$.next(this.session?.user)
    }
    return this.session
  }

  // Not currently implemented
  async signInWithEmail(email: string, password: string) {
      return await this.supabase.auth.signInWithPassword({
          email: email,
          password: password,
      });
  }

  async signOut() {
    await this.supabase.auth.signOut()
    window.location.reload()
  }

  async signInWithGoogle() {
    return await this.supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }
}
