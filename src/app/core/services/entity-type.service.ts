import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Type } from 'src/app/shared/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class EntityTypeService {

  constructor(private supabase: SupabaseClient) {}

async selectAllEntityTypes(): Promise<Type[] | null>{
    const { data, error } = await this.supabase
    .from('entity_type')
    .select(`
      *
      `);

  if (error) throw error;
  return data as Type[];
  }
}