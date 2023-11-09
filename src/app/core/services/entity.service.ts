import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Entity } from 'src/app/shared/models/entity.model';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private supabase: SupabaseClient) {}



  async selectEntities(type: number): Promise<Entity[] | null> {
    const { data, error } = await this.supabase
      .from('entity')
      .select(`
        *,
        entity_type(*),
        entity_field_type(*),
        entity_field_value(*)
        `);

    if (error) throw error;
    return data as Entity[];
  }

  async selectEntity(id: number): Promise<Entity | null> {
    const { data, error } = await this.supabase
      .from('entity')
      .select(`
        *,
        entity_type(*),
        entity_field_type(*),
        entity_field_value(*)
        `)
      .eq('id', id)
      .single();

      //group tags by type

    if (error) throw error;
    return data as Entity;
  }

  async editEntity(entity: Entity): Promise<Entity | null> {
    const { data, error } = await this.supabase
      .from('public.entity')
      .update(entity)
      .eq('id', entity.id);

    if (error) throw error;
    return this.selectEntity(entity.id);
  }

  async deleteEntity(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('public.entity')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ... Similar methods for other operations and models ...
}