export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      magic_analyses: {
        Row: {
          alternative_system: string | null
          confidence: number
          created_at: string
          id: string
          kelly_stake: number | null
          match_ids: string[]
          mode: string
          reasoning: string | null
          selections: Json
          ticket_label: string | null
          total_odds: number | null
          value_bets: Json
        }
        Insert: {
          alternative_system?: string | null
          confidence?: number
          created_at?: string
          id?: string
          kelly_stake?: number | null
          match_ids?: string[]
          mode?: string
          reasoning?: string | null
          selections?: Json
          ticket_label?: string | null
          total_odds?: number | null
          value_bets?: Json
        }
        Update: {
          alternative_system?: string | null
          confidence?: number
          created_at?: string
          id?: string
          kelly_stake?: number | null
          match_ids?: string[]
          mode?: string
          reasoning?: string | null
          selections?: Json
          ticket_label?: string | null
          total_odds?: number | null
          value_bets?: Json
        }
        Relationships: []
      }
      matches_cache: {
        Row: {
          away_team: string
          commence_time: string
          country: string | null
          created_at: string
          home_team: string
          league: string | null
          match_key: string
          paris_date: string | null
          paris_time: string | null
          payload: Json
          source: string | null
          updated_at: string
        }
        Insert: {
          away_team: string
          commence_time: string
          country?: string | null
          created_at?: string
          home_team: string
          league?: string | null
          match_key: string
          paris_date?: string | null
          paris_time?: string | null
          payload?: Json
          source?: string | null
          updated_at?: string
        }
        Update: {
          away_team?: string
          commence_time?: string
          country?: string | null
          created_at?: string
          home_team?: string
          league?: string | null
          match_key?: string
          paris_date?: string | null
          paris_time?: string | null
          payload?: Json
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      odds_cache: {
        Row: {
          away: number | null
          away_team: string
          best_away: number | null
          best_draw: number | null
          best_home: number | null
          bookmakers: Json | null
          commence_time: string | null
          created_at: string
          draw: number | null
          home: number | null
          home_team: string
          match_key: string
          raw: Json
          updated_at: string
        }
        Insert: {
          away?: number | null
          away_team: string
          best_away?: number | null
          best_draw?: number | null
          best_home?: number | null
          bookmakers?: Json | null
          commence_time?: string | null
          created_at?: string
          draw?: number | null
          home?: number | null
          home_team: string
          match_key: string
          raw?: Json
          updated_at?: string
        }
        Update: {
          away?: number | null
          away_team?: string
          best_away?: number | null
          best_draw?: number | null
          best_home?: number | null
          bookmakers?: Json | null
          commence_time?: string | null
          created_at?: string
          draw?: number | null
          home?: number | null
          home_team?: string
          match_key?: string
          raw?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "odds_cache_match_key_fkey"
            columns: ["match_key"]
            isOneToOne: true
            referencedRelation: "matches_cache"
            referencedColumns: ["match_key"]
          },
        ]
      }
      sync_log: {
        Row: {
          duration_ms: number | null
          finished_at: string | null
          id: string
          items_added: number | null
          items_updated: number | null
          job: string
          message: string | null
          started_at: string
          status: string
        }
        Insert: {
          duration_ms?: number | null
          finished_at?: string | null
          id?: string
          items_added?: number | null
          items_updated?: number | null
          job: string
          message?: string | null
          started_at?: string
          status: string
        }
        Update: {
          duration_ms?: number | null
          finished_at?: string | null
          id?: string
          items_added?: number | null
          items_updated?: number | null
          job?: string
          message?: string | null
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      team_stats_cache: {
        Row: {
          attack: number | null
          created_at: string
          defense: number | null
          force: number | null
          form: string | null
          league: string | null
          league_id: number | null
          payload: Json
          season: number | null
          team_key: string
          team_name: string
          updated_at: string
        }
        Insert: {
          attack?: number | null
          created_at?: string
          defense?: number | null
          force?: number | null
          form?: string | null
          league?: string | null
          league_id?: number | null
          payload?: Json
          season?: number | null
          team_key: string
          team_name: string
          updated_at?: string
        }
        Update: {
          attack?: number | null
          created_at?: string
          defense?: number | null
          force?: number | null
          form?: string | null
          league?: string | null
          league_id?: number | null
          payload?: Json
          season?: number | null
          team_key?: string
          team_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      teams_cache: {
        Row: {
          badge_url: string | null
          banner_url: string | null
          country: string | null
          country_code: string | null
          created_at: string
          description: string | null
          founded: string | null
          kit_url: string | null
          name: string
          name_key: string
          payload: Json
          stadium: string | null
          updated_at: string
        }
        Insert: {
          badge_url?: string | null
          banner_url?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          description?: string | null
          founded?: string | null
          kit_url?: string | null
          name: string
          name_key: string
          payload?: Json
          stadium?: string | null
          updated_at?: string
        }
        Update: {
          badge_url?: string | null
          banner_url?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          description?: string | null
          founded?: string | null
          kit_url?: string | null
          name?: string
          name_key?: string
          payload?: Json
          stadium?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      wina_matches: {
        Row: {
          away_jersey: string | null
          away_logo: string | null
          away_team: string
          category: string | null
          fetched_at: string
          home_jersey: string | null
          home_logo: string | null
          home_team: string
          id: string
          match_start: string
          minute: number | null
          odds_away: number | null
          odds_draw: number | null
          odds_home: number | null
          payload: Json | null
          score: string | null
          sport_id: number
          sport_name: string
          status: string
          title: string
          tournament: string
          updated_at: string
        }
        Insert: {
          away_jersey?: string | null
          away_logo?: string | null
          away_team: string
          category?: string | null
          fetched_at?: string
          home_jersey?: string | null
          home_logo?: string | null
          home_team: string
          id: string
          match_start: string
          minute?: number | null
          odds_away?: number | null
          odds_draw?: number | null
          odds_home?: number | null
          payload?: Json | null
          score?: string | null
          sport_id: number
          sport_name: string
          status: string
          title: string
          tournament: string
          updated_at?: string
        }
        Update: {
          away_jersey?: string | null
          away_logo?: string | null
          away_team?: string
          category?: string | null
          fetched_at?: string
          home_jersey?: string | null
          home_logo?: string | null
          home_team?: string
          id?: string
          match_start?: string
          minute?: number | null
          odds_away?: number | null
          odds_draw?: number | null
          odds_home?: number | null
          payload?: Json | null
          score?: string | null
          sport_id?: number
          sport_name?: string
          status?: string
          title?: string
          tournament?: string
          updated_at?: string
        }
        Relationships: []
      }
      wina_sports: {
        Row: {
          count: number
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          count?: number
          id: number
          name: string
          updated_at?: string
        }
        Update: {
          count?: number
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      wina_tournaments: {
        Row: {
          count: number
          name: string
          sport_id: number | null
          updated_at: string
        }
        Insert: {
          count?: number
          name: string
          sport_id?: number | null
          updated_at?: string
        }
        Update: {
          count?: number
          name?: string
          sport_id?: number | null
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
