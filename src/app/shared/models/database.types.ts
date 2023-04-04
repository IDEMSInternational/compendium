export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
      }
      entity_type: {
        Row: {
          collection_name: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: number
          name: string
        }
        Insert: {
          collection_name?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name: string
        }
        Update: {
          collection_name?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name?: string
        }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

