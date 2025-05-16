export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ae_dashboard_data: {
        Row: {
          account_id: string
          account_summary: string | null
          action_assessment_engagement_email_open_rate: number | null
          action_assessment_engagement_meeting_attendance: number | null
          action_assessment_engagement_response_rate: number | null
          action_assessment_recommended_cadence: string | null
          action_assessment_summary: string | null
          analysis_date: string | null
          company_name: string | null
          created_at: string
          health_score_change_value: number | null
          health_score_current: number | null
          health_score_trend: string | null
          opportunity_score: number | null
          risk_assessment_overall_risk_score: number | null
          risk_assessment_summary: string | null
          signal_analysis_sentiment_score: number | null
          signal_analysis_summary: string | null
          updated_at: string
        }
        Insert: {
          account_id: string
          account_summary?: string | null
          action_assessment_engagement_email_open_rate?: number | null
          action_assessment_engagement_meeting_attendance?: number | null
          action_assessment_engagement_response_rate?: number | null
          action_assessment_recommended_cadence?: string | null
          action_assessment_summary?: string | null
          analysis_date?: string | null
          company_name?: string | null
          created_at?: string
          health_score_change_value?: number | null
          health_score_current?: number | null
          health_score_trend?: string | null
          opportunity_score?: number | null
          risk_assessment_overall_risk_score?: number | null
          risk_assessment_summary?: string | null
          signal_analysis_sentiment_score?: number | null
          signal_analysis_summary?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          account_summary?: string | null
          action_assessment_engagement_email_open_rate?: number | null
          action_assessment_engagement_meeting_attendance?: number | null
          action_assessment_engagement_response_rate?: number | null
          action_assessment_recommended_cadence?: string | null
          action_assessment_summary?: string | null
          analysis_date?: string | null
          company_name?: string | null
          created_at?: string
          health_score_change_value?: number | null
          health_score_current?: number | null
          health_score_trend?: string | null
          opportunity_score?: number | null
          risk_assessment_overall_risk_score?: number | null
          risk_assessment_summary?: string | null
          signal_analysis_sentiment_score?: number | null
          signal_analysis_summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ae_deal_progress: {
        Row: {
          account_id: string
          created_at: string
          days: number | null
          id: string
          stage: string | null
        }
        Insert: {
          account_id: string
          created_at?: string
          days?: number | null
          id?: string
          stage?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string
          days?: number | null
          id?: string
          stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_deal_progress_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_effective_actions: {
        Row: {
          account_id: string
          action_description: string | null
          created_at: string
          id: string
        }
        Insert: {
          account_id: string
          action_description?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          account_id?: string
          action_description?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ae_effective_actions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_engagement_over_time: {
        Row: {
          account_id: string
          created_at: string
          date: string | null
          id: string
          value: number | null
        }
        Insert: {
          account_id: string
          created_at?: string
          date?: string | null
          id?: string
          value?: number | null
        }
        Update: {
          account_id?: string
          created_at?: string
          date?: string | null
          id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_engagement_over_time_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_ineffective_actions: {
        Row: {
          account_id: string
          action_description: string | null
          created_at: string
          id: string
        }
        Insert: {
          account_id: string
          action_description?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          account_id?: string
          action_description?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ae_ineffective_actions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_risks: {
        Row: {
          account_id: string
          created_at: string
          id: string
          impact: string | null
          mitigation: string | null
          probability: number | null
          risk_description: string | null
        }
        Insert: {
          account_id: string
          created_at?: string
          id?: string
          impact?: string | null
          mitigation?: string | null
          probability?: number | null
          risk_description?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string
          id?: string
          impact?: string | null
          mitigation?: string | null
          probability?: number | null
          risk_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_risks_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_signals: {
        Row: {
          account_id: string
          category: string | null
          created_at: string
          date_detected: string | null
          id: string
          priority: string | null
          signal_text: string | null
        }
        Insert: {
          account_id: string
          category?: string | null
          created_at?: string
          date_detected?: string | null
          id?: string
          priority?: string | null
          signal_text?: string | null
        }
        Update: {
          account_id?: string
          category?: string | null
          created_at?: string
          date_detected?: string | null
          id?: string
          priority?: string | null
          signal_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_signals_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_tactical_recommendations: {
        Row: {
          account_id: string
          action_description: string | null
          created_at: string
          expected_outcome: string | null
          id: string
          priority: string | null
          rationale: string | null
          timing: string | null
        }
        Insert: {
          account_id: string
          action_description?: string | null
          created_at?: string
          expected_outcome?: string | null
          id?: string
          priority?: string | null
          rationale?: string | null
          timing?: string | null
        }
        Update: {
          account_id?: string
          action_description?: string | null
          created_at?: string
          expected_outcome?: string | null
          id?: string
          priority?: string | null
          rationale?: string | null
          timing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_tactical_recommendations_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
        ]
      }
      ae_talking_points: {
        Row: {
          account_id: string
          created_at: string
          id: string
          point: string | null
          supporting_data: string | null
          topic: string | null
        }
        Insert: {
          account_id: string
          created_at?: string
          id?: string
          point?: string | null
          supporting_data?: string | null
          topic?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string
          id?: string
          point?: string | null
          supporting_data?: string | null
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ae_talking_points_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ae_dashboard_data"
            referencedColumns: ["account_id"]
          },
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
