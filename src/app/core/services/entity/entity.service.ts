import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'src/app/shared/models/database.types';
import { Entity } from 'src/app/shared/models/entity.types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private supabase: SupabaseClient<Database>

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase
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
        entity_field_type (id, field, display_order, description)
      `)
      .eq("entity_id", entityId)
  }

  async getFieldsForEntityType(entityTypeId: number) {
    return await this.supabase
      .from("entity_field_type")
      .select("id, field, display_order, description")
      .eq("entity_type_id", entityTypeId)
  }

  async getValueForField(entityFieldTypeId: number, entityId: number) {
    return await this.supabase
      .from("entity_field_value")
      .select("value")
      .eq("entity_field_type_id", entityFieldTypeId)
      .eq("entity_id", entityId)
  }

  async getEntityTypes() {
    return await this.supabase.from("entity_type").select("*")
  }

  async getEntityTypeById(entityTypeId: number) {
    return await this.supabase.from("entity_type").select("*").eq("id", entityTypeId).single()
  }

  async getTagsForEntity(entityId: number) {
    return await this.supabase.from("entity_tag").select("*").or(`entity_id.eq.${entityId},linked_entity_id.eq.${entityId}`)
  }

  async getLinksForEntityType(entityTypeId: number) {
    return await this.supabase.from("entity_link").select("*").or(`entity_type_id.eq.${entityTypeId},link_entity_type_id.eq.${entityTypeId}`)
  }

  // Pass in whole entity objects in order to read of entity type IDs
  async addTagToEntity(entity: Entity, linkedEntity: Entity) {
    return await this.supabase
      .from("entity_tag")
      .insert({ entity_id: entity.id, entity_type_id: entity.entity_type_id!, linked_entity_id: linkedEntity.id, linked_entity_type_id: linkedEntity.entity_type_id! })
  }

  async removeTagFromEntity(entityId: number, linkedEntityId: number) {
    return await this.supabase
      .from("entity_tag")
      .delete()
      // Remove tags that exist between the two entities in either direction
      .or(`and(entity_id.eq.${entityId},linked_entity_id.eq.${linkedEntityId}),and(entity_id.eq.${linkedEntityId},linked_entity_id.eq.${entityId})`)
  }

  async updateEntityFields(entityId: number, updates: any) {
    for (const [entityFieldTypeId, entityFieldValue] of Object.entries(updates)) {
      const result = await this.supabase
        .from("entity_field_value")
        .upsert({
          entity_id: entityId,
          entity_field_type_id: Number(entityFieldTypeId),
          value: String(entityFieldValue)
        })
    }
  }

  async createEntity(entityTypeId: number) {
    return await this.supabase
      .from("entity")
      .insert({
        entity_type_id: entityTypeId
      })
      .select()
  }
}