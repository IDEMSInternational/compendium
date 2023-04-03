import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { Database } from 'src/app/shared/models/database.types';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = createClient<Database>(environment.supabaseConfig.supabaseUrl, environment.supabaseConfig.supabaseKey)
  }

  async getEntities() {
    return await this.supabase.from("entity").select("*")
  }

  async getEntitiesByType(entityTypeId: number) {
    return await this.supabase.from("entity").select("*").eq("entity_type_id", entityTypeId)
  }

  async getFieldsForEntity(entityId: number) {
    return await this.supabase
      .from("entity_field_value")
      .select(`value,
        entity_field_type (field)
      `)
      .eq("entity_id", entityId)
  }

}