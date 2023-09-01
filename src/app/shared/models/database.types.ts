export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      entity: {
        Row: {
          created_at: string | null
          entity_type_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          entity_type_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          entity_type_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      entity_field_type: {
        Row: {
          created_at: string | null
          description: string | null
          display_in_table: boolean | null
          display_order: number | null
          entity_type_id: number | null
          field: string
          id: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_in_table?: boolean | null
          display_order?: number | null
          entity_type_id?: number | null
          field: string
          id?: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_in_table?: boolean | null
          display_order?: number | null
          entity_type_id?: number | null
          field?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "entity_field_type_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      entity_field_value: {
        Row: {
          created_at: string | null
          entity_field_type_id: number
          entity_id: number
          value: string
        }
        Insert: {
          created_at?: string | null
          entity_field_type_id: number
          entity_id: number
          value: string
        }
        Update: {
          created_at?: string | null
          entity_field_type_id?: number
          entity_id?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_field_value_entity_field_type_id_fkey"
            columns: ["entity_field_type_id"]
            referencedRelation: "entity_field_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_field_value_entity_id_fkey"
            columns: ["entity_id"]
            referencedRelation: "entity"
            referencedColumns: ["id"]
          }
        ]
      }
      entity_link: {
        Row: {
          created_at: string | null
          entity_type_id: number
          link_entity_type_id: number
          multiple: boolean
        }
        Insert: {
          created_at?: string | null
          entity_type_id?: number
          link_entity_type_id: number
          multiple?: boolean
        }
        Update: {
          created_at?: string | null
          entity_type_id?: number
          link_entity_type_id?: number
          multiple?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "entity_link_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_link_link_entity_type_id_fkey"
            columns: ["link_entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      entity_tag: {
        Row: {
          created_at: string | null
          entity_id: number
          entity_type_id: number
          linked_entity_id: number
          linked_entity_type_id: number
        }
        Insert: {
          created_at?: string | null
          entity_id?: number
          entity_type_id: number
          linked_entity_id: number
          linked_entity_type_id: number
        }
        Update: {
          created_at?: string | null
          entity_id?: number
          entity_type_id?: number
          linked_entity_id?: number
          linked_entity_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "entity_tag_entity_id_fkey"
            columns: ["entity_id"]
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_tag_entity_type_id_fkey"
            columns: ["entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_tag_linked_entity_id_fkey"
            columns: ["linked_entity_id"]
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_tag_linked_entity_type_id_fkey"
            columns: ["linked_entity_type_id"]
            referencedRelation: "entity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      entity_type: {
        Row: {
          collection_name: string | null
          created_at: string | null
          description: string | null
          display_field_type_id: number | null
          display_order: number | null
          id: number
          name: string
        }
        Insert: {
          collection_name?: string | null
          created_at?: string | null
          description?: string | null
          display_field_type_id?: number | null
          display_order?: number | null
          id?: number
          name: string
        }
        Update: {
          collection_name?: string | null
          created_at?: string | null
          description?: string | null
          display_field_type_id?: number | null
          display_order?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_type_display_field_type_id_fkey"
            columns: ["display_field_type_id"]
            referencedRelation: "entity_field_type"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
