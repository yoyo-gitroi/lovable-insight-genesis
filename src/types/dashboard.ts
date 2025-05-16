
// AE Dashboard View Types
export interface AEHealthScore {
  current: number;
  trend: "up" | "down" | "stable";
  change_value: number;
}

export interface AESignal {
  signal: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  date_detected: string;
}

export interface AESignalAnalysis {
  summary: string;
  signals_by_priority: AESignal[];
  sentiment_score: number; // e.g., 0-100
}

export interface AEEngagementMetrics {
  email_open_rate: number; // percentage
  response_rate: number; // percentage
  meeting_attendance: number; // percentage
}

export interface AEActionAssessment {
  summary: string;
  effective_actions: string[];
  ineffective_actions: string[];
  recommended_cadence: string;
  engagement_metrics: AEEngagementMetrics;
}

export interface AETacticalRecommendation {
  action: string;
  rationale: string;
  expected_outcome: string;
  timing: string;
  priority: "High" | "Medium" | "Low";
}

export interface AETalkingPoint {
  topic: string;
  point: string;
  supporting_data: string;
}

export interface AERisk {
  risk: string;
  probability: number; // 0-1
  impact: "High" | "Medium" | "Low";
  mitigation: string;
}

export interface AERiskAssessment {
  summary: string;
  risks: AERisk[];
  overall_risk_score: number; // e.g., 0-100
}

export interface AETimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface AEDealProgressPoint {
  stage: string;
  days: number;
}

export interface AETimeSeries {
  engagement_over_time: AETimeSeriesDataPoint[];
  deal_progress: AEDealProgressPoint[];
}

export interface AEDashboardData {
  account_id: string;
  company_name: string;
  analysis_date: string;
  account_summary: string;
  health_score: AEHealthScore;
  signal_analysis: AESignalAnalysis;
  action_assessment: AEActionAssessment;
  tactical_recommendations: AETacticalRecommendation[];
  talking_points: AETalkingPoint[];
  risk_assessment: AERiskAssessment;
  time_series_data: AETimeSeries;
  opportunity_score: number; // e.g., 0-100
}

// CRO Dashboard View Types
export interface CROKeyMetrics {
  total_pipeline_value: number;
  average_deal_size: number;
  win_rate: number; // percentage
  average_sales_cycle: number; // days
  conversion_rates_by_stage: { stage: string; conversion_rate: number }[];
}

export interface CRODealDistribution {
  by_stage: { stage: string; count: number; value: number }[];
  by_size: { size_range: string; count: number; value: number }[];
  by_industry: { industry: string; count: number; value: number }[];
  by_geo: { geo: string; count: number; value: number }[];
}

export interface CRORevenuePerformance {
  overall_health: string; // e.g., "Good", "Needs Attention"
  pipeline_summary: string;
  key_metrics: CROKeyMetrics;
  deal_distribution: CRODealDistribution;
}

export interface CROActivityMetrics {
  average_meetings_per_deal: number;
  average_emails_per_deal: number;
  average_calls_per_deal: number;
  activity_to_close_correlation: number; // e.g., 0-1
  days_between_activities: number;
}

export interface CROActivityEfficiency {
  most_effective_sequences: string[];
  least_effective_activities: string[];
}

export interface CROSalesActivityAnalysis {
  summary: string;
  activity_metrics: CROActivityMetrics;
  activity_efficiency: CROActivityEfficiency;
  engagement_patterns: string[]; // Could be more structured
}

export interface CROSignalInsights {
  summary: string;
  high_value_signals: string[]; // Could be objects with more detail
  customer_pain_points: string[];
  competitive_intelligence: string[];
}

export interface CRORepPerformance {
  rep_name: string;
  pipeline_value: number;
  win_rate: number;
  avg_deal_size: number;
  activities_count: number;
}

export interface CROTeamPerformance {
  summary: string;
  rep_performance: CRORepPerformance[];
  coaching_opportunities: string[];
}

export interface CROVisualizationData {
  pipeline_by_stage: { name: string; value: number }[];
  deal_velocity_trend: { date: string; value: number }[];
  win_rate_by_deal_size: { size_range: string; win_rate: number }[];
  activity_correlation: { activity_metric: string; correlation_score: number }[];
  sales_cycle_by_industry: { industry: string; cycle_days: number }[];
  forecasted_vs_actual_revenue: { period: string; forecasted: number; actual: number }[];
  top_signals_impact: { signal: string; impact_score: number }[];
}

export interface CRODashboardData {
  analysis_id: string;
  generation_date: string;
  executive_summary: string;
  revenue_performance: CRORevenuePerformance;
  sales_activity_analysis: CROSalesActivityAnalysis;
  signal_insights: CROSignalInsights;
  team_performance: CROTeamPerformance;
  strategic_recommendations: string[];
  revenue_levers: string[];
  visualization_data: CROVisualizationData;
}

