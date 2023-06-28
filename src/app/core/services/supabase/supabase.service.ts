import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
import { Database } from 'src/app/shared/models/database.types';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient

  constructor() {
    this.supabase = createClient<Database>(environment.supabaseConfig.supabaseUrl, environment.supabaseConfig.supabaseKey)
  }
}
