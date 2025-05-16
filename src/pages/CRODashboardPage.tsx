
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import PlaceholderChart from '@/components/charts/PlaceholderChart';
import { CRODashboardData } from '@/types/dashboard';
import { BarChartBig, Briefcase, Users, Target, TrendingUp, Settings } from 'lucide-react';

// Placeholder data for CRO Dashboard
const mockCROData: CRODashboardData = {
  analysis_id: "CRO_ANALYSIS_001",
  generation_date: new Date().toLocaleDateString(),
  executive_summary: "Overall pipeline health is strong with a 15% growth QoQ. Key areas for focus include improving conversion rates in the 'Negotiation' stage and addressing competitive pressures in the EMEA region.",
  revenue_performance: {
    overall_health: "Good",
    pipeline_summary: "Total pipeline value at $5.2M, with 60% in 'Proposal' or 'Negotiation' stages.",
    key_metrics: {
      total_pipeline_value: 5200000,
      average_deal_size: 75000,
      win_rate: 28,
      average_sales_cycle: 65, // days
      conversion_rates_by_stage: [
        { stage: "Lead", conversion_rate: 60 },
        { stage: "Qualified", conversion_rate: 45 },
        { stage: "Proposal", conversion_rate: 30 },
        { stage: "Negotiation", conversion_rate: 20 },
      ],
    },
    deal_distribution: {
      by_stage: [{ stage: "Proposal", count: 20, value: 1500000 }, { stage: "Negotiation", count: 15, value: 1125000 }],
      by_size: [{ size_range: "$50k-$100k", count: 30, value: 2000000 }, { size_range: ">$100k", count: 10, value: 1500000 }],
      by_industry: [{ industry: "Tech", count: 25, value: 2500000 }, { industry: "Finance", count: 15, value: 1200000 }],
      by_geo: [{ geo: "NA", count: 30, value: 3000000 }, { geo: "EMEA", count: 10, value: 800000 }],
    },
  },
  sales_activity_analysis: {
    summary: "High activity levels across the team. Email sequences show highest engagement.",
    activity_metrics: {
      average_meetings_per_deal: 3.5,
      average_emails_per_deal: 12.2,
      average_calls_per_deal: 5.1,
      activity_to_close_correlation: 0.75,
      days_between_activities: 3,
    },
    activity_efficiency: {
      most_effective_sequences: ["Sequence A (Intro + Demo + Follow-up)", "Sequence C (Value Prop + Case Study)"],
      least_effective_activities: ["Generic cold calls", "Lengthy initial emails"],
    },
    engagement_patterns: ["Personalized video outreach yields 2x response rate.", "Thursday afternoons best for demos."],
  },
  signal_insights: {
    summary: "Key buying signals include requests for integration details and security documentation.",
    high_value_signals: ["'We need a solution by Q3'", "'Can this integrate with Salesforce?'"],
    customer_pain_points: ["Current solution too complex", "Lack of scalability with existing tools"],
    competitive_intelligence: ["Competitor X offering 10% discount", "Competitor Z launched new feature"],
  },
  team_performance: {
    summary: "Top performers consistently leverage CRM data for personalization. Coaching needed on objection handling for newer AEs.",
    rep_performance: [
      { rep_name: "Alice Smith", pipeline_value: 1200000, win_rate: 35, avg_deal_size: 80000, activities_count: 150 },
      { rep_name: "Bob Johnson", pipeline_value: 900000, win_rate: 25, avg_deal_size: 70000, activities_count: 120 },
    ],
    coaching_opportunities: ["Improve discovery call techniques", "Strengthen negotiation skills"],
  },
  strategic_recommendations: [
    "Launch targeted campaign for Finance industry based on recent wins.",
    "Develop advanced training module on handling price objections.",
  ],
  revenue_levers: ["Increasing average deal size by 10%", "Improving 'Negotiation' to 'Closed Won' conversion by 5%"],
  visualization_data: { // Simplified for brevity
    pipeline_by_stage: [{ name: "Lead", value: 1000000 }, { name: "Qualified", value: 1500000 }, { name: "Proposal", value: 2000000 }, { name: "Negotiation", value: 700000 }],
    deal_velocity_trend: [{ date: "Q1", value: 70 }, { date: "Q2", value: 65 }, { date: "Q3", value: 62 }],
    win_rate_by_deal_size: [{ size_range: "<$50k", win_rate: 30 }, { size_range: "$50k-$100k", win_rate: 25 }, { size_range: ">$100k", win_rate: 20 }],
    activity_correlation: [{ activity_metric: "Emails Sent", correlation_score: 0.6 }, { activity_metric: "Meetings Held", correlation_score: 0.75 }],
    sales_cycle_by_industry: [{ industry: "Tech", cycle_days: 60 }, { industry: "Finance", cycle_days: 75 }],
    forecasted_vs_actual_revenue: [{ period: "Q1", forecasted: 1.2, actual: 1.1 }, { period: "Q2", forecasted: 1.5, actual: 1.6 }],
    top_signals_impact: [{ signal: "Integration Request", impact_score: 8 }, { signal: "Budget Concern", impact_score: 6 }],
  },
};


const CRODashboardPage: React.FC = () => {
  const data = mockCROData;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">CRO Dashboard</h1>
        <p className="text-sm text-gray-500">Analysis Date: {data.generation_date}</p>
      </div>

      <DashboardCard title="Executive Summary" className="mb-6 bg-indigo-50 border-indigo-200">
        <p className="text-indigo-800">{data.executive_summary}</p>
      </DashboardCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Revenue Performance" description={`Overall Health: ${data.revenue_performance.overall_health}`}>
          <Briefcase className="h-6 w-6 text-green-500 mb-2" />
          <p className="text-sm text-gray-600 mb-1">Total Pipeline: ${data.revenue_performance.key_metrics.total_pipeline_value.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mb-1">Avg Deal Size: ${data.revenue_performance.key_metrics.average_deal_size.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mb-1">Win Rate: {data.revenue_performance.key_metrics.win_rate}%</p>
          <p className="text-sm text-gray-600">Avg Sales Cycle: {data.revenue_performance.key_metrics.average_sales_cycle} days</p>
          <PlaceholderChart data={data.visualization_data.pipeline_by_stage} title="Pipeline by Stage"/>
        </DashboardCard>

        <DashboardCard title="Sales Activity Analysis">
          <BarChartBig className="h-6 w-6 text-blue-500 mb-2" />
          <p className="text-sm text-gray-600 mb-2">{data.sales_activity_analysis.summary}</p>
          <p className="text-sm text-gray-600 mb-1">Avg Meetings/Deal: {data.sales_activity_analysis.activity_metrics.average_meetings_per_deal}</p>
          <p className="text-sm text-gray-600 mb-1">Avg Emails/Deal: {data.sales_activity_analysis.activity_metrics.average_emails_per_deal}</p>
          <PlaceholderChart data={data.visualization_data.activity_correlation.map(ac => ({ name: ac.activity_metric, value: ac.correlation_score * 100}))} title="Activity Correlation to Close"/>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Signal Insights">
            <Target className="h-6 w-6 text-purple-500 mb-2" />
            <p className="text-sm text-gray-600 mb-2">{data.signal_insights.summary}</p>
            <h4 className="font-semibold text-sm mt-2">High Value Signals:</h4>
            <ul className="list-disc list-inside text-xs pl-2">{data.signal_insights.high_value_signals.slice(0,2).map((s, i) => <li key={i}>{s}</li>)}</ul>
        </DashboardCard>
        <DashboardCard title="Team Performance">
            <Users className="h-6 w-6 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600 mb-2">{data.team_performance.summary}</p>
            <h4 className="font-semibold text-sm mt-2">Top Performer Example:</h4>
            <p className="text-xs">{data.team_performance.rep_performance[0]?.rep_name} - Win Rate: {data.team_performance.rep_performance[0]?.win_rate}%</p>
        </DashboardCard>
         <DashboardCard title="Strategic Recommendations">
            <Settings className="h-6 w-6 text-teal-500 mb-2" />
            <ul className="space-y-1 text-sm">
                {data.strategic_recommendations.slice(0,2).map((rec, idx) => <li key={idx} className="flex items-start"><TrendingUp className="h-4 w-4 mr-2 mt-1 text-teal-600 flex-shrink-0"/>{rec}</li>)}
            </ul>
        </DashboardCard>
      </div>
      
      <DashboardCard title="Key Visualizations" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlaceholderChart data={data.visualization_data.deal_velocity_trend.map(dv => ({ name: dv.date, value: dv.value}))} title="Deal Velocity Trend (Days)"/>
            <PlaceholderChart data={data.visualization_data.win_rate_by_deal_size.map(wr => ({ name: wr.size_range, value: wr.win_rate}))} title="Win Rate by Deal Size (%)"/>
            <PlaceholderChart data={data.visualization_data.sales_cycle_by_industry.map(sc => ({ name: sc.industry, value: sc.cycle_days}))} title="Sales Cycle by Industry (Days)"/>
            <PlaceholderChart data={data.visualization_data.forecasted_vs_actual_revenue.map(fa => ({ name: fa.period, Forecasted: fa.forecasted, Actual: fa.actual}))} title="Forecasted vs Actual Revenue (Millions)"/>
        </div>
      </DashboardCard>

    </DashboardLayout>
  );
};

export default CRODashboardPage;
