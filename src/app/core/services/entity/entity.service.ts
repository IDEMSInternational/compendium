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
    return await this.supabase
      .from("entity")
      .select("*")
      // Ordering by a related table is a feature pending release https://github.com/supabase/postgrest-js/issues/198#issuecomment-1355838953
      // .order("entity_type(display_order)")
  }

  async getEntitiesByType(entityTypeId: number) {
    return await this.supabase.from("entity").select("*").eq("entity_type_id", entityTypeId)
  }

  async getEntityById(entityId: number) {
    return await this.supabase.from("entity").select("*").eq("id", entityId).limit(1).single()
  }

  async getFieldsForEntity(entityId: number) {
    return await this.supabase
      .from("entity_field_value")
      .select(`value,
        entity_field_type (field, display_order)
      `)
      .eq("entity_id", entityId)
  }

  async getEntityTypes() {
    return await this.supabase.from("entity_type").select("*")
  }

  async getTagsForEntity(entityId: number) {
    return await this.supabase.from("entity_tag").select("*").or(`entity_id.eq.${entityId},linked_entity_id.eq.${entityId}`)
  }
}