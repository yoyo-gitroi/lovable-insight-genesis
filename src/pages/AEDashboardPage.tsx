import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import PlaceholderChart from '@/components/charts/PlaceholderChart';
import { AEDashboardData, AEHealthScore, AESignal, AETacticalRecommendation, AETalkingPoint, AERisk, AETimeSeriesDataPoint, AEDealProgressPoint } from '@/types/dashboard';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, List, MessageSquare, ShieldAlert } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// Hardcoded account ID for now
const ACCOUNT_ID_TO_FETCH = "ACC12345";

// Function to fetch and transform AE Dashboard data from Supabase
const fetchAEDashboardData = async (accountId: string): Promise<AEDashboardData | null> => {
  // 1. Fetch main data
  const { data: mainData, error: mainError } = await supabase
    .from('ae_dashboard_data')
    .select('*')
    .eq('account_id', accountId)
    .single();

  if (mainError) {
    console.error('Error fetching main AE dashboard data:', mainError);
    // If row not found, it's a specific error we can treat as "no data"
    if (mainError.code === 'PGRST116') return null; 
    throw mainError; // For other errors, re-throw
  }
  if (!mainData) return null;


  // 2. Fetch related data (parallel fetches)
  const [
    signalsRes,
    effectiveActionsRes,
    ineffectiveActionsRes,
    recommendationsRes,
    talkingPointsRes,
    risksRes,
    engagementTimeRes,
    dealProgressRes
  ] = await Promise.all([
    supabase.from('ae_signals').select('*').eq('account_id', accountId),
    supabase.from('ae_effective_actions').select('action_description').eq('account_id', accountId),
    supabase.from('ae_ineffective_actions').select('action_description').eq('account_id', accountId),
    supabase.from('ae_tactical_recommendations').select('*').eq('account_id', accountId),
    supabase.from('ae_talking_points').select('*').eq('account_id', accountId),
    supabase.from('ae_risks').select('*').eq('account_id', accountId),
    supabase.from('ae_engagement_over_time').select('date, value').eq('account_id', accountId),
    supabase.from('ae_deal_progress').select('stage, days').eq('account_id', accountId)
  ]);

  // Minimal error logging for related data fetches for brevity in example
  if (signalsRes.error) console.error('Error fetching signals:', signalsRes.error);
  if (effectiveActionsRes.error) console.error('Error fetching effective actions:', effectiveActionsRes.error);
  // ... (add similar checks for other related data fetches if detailed logging is needed)

  // 3. Transform and combine data
  const transformedData: AEDashboardData = {
    account_id: mainData.account_id,
    company_name: mainData.company_name || "N/A",
    analysis_date: mainData.analysis_date ? new Date(mainData.analysis_date).toLocaleDateString() : new Date().toLocaleDateString(),
    account_summary: mainData.account_summary || "",
    health_score: {
      current: mainData.health_score_current || 0,
      trend: (mainData.health_score_trend || "stable") as AEHealthScore['trend'],
      change_value: mainData.health_score_change_value || 0,
    },
    signal_analysis: {
      summary: mainData.signal_analysis_summary || "",
      signals_by_priority: signalsRes.data?.map((s): AESignal => ({
        signal: s.signal_text || "",
        priority: (s.priority || "Low") as AESignal['priority'],
        category: s.category || "",
        date_detected: s.date_detected ? new Date(s.date_detected).toLocaleDateString() : "",
      })) || [],
      sentiment_score: mainData.signal_analysis_sentiment_score || 0,
    },
    action_assessment: {
      summary: mainData.action_assessment_summary || "",
      effective_actions: effectiveActionsRes.data?.map(a => a.action_description || "") || [],
      ineffective_actions: ineffectiveActionsRes.data?.map(a => a.action_description || "") || [],
      recommended_cadence: mainData.action_assessment_recommended_cadence || "",
      engagement_metrics: {
        email_open_rate: mainData.action_assessment_engagement_email_open_rate || 0,
        response_rate: mainData.action_assessment_engagement_response_rate || 0,
        meeting_attendance: mainData.action_assessment_engagement_meeting_attendance || 0,
      },
    },
    tactical_recommendations: recommendationsRes.data?.map((r): AETacticalRecommendation => ({
      action: r.action_description || "",
      rationale: r.rationale || "",
      expected_outcome: r.expected_outcome || "",
      timing: r.timing || "",
      priority: (r.priority || "Low") as AETacticalRecommendation['priority'],
    })) || [],
    talking_points: talkingPointsRes.data?.map((tp): AETalkingPoint => ({
      topic: tp.topic || "",
      point: tp.point || "",
      supporting_data: tp.supporting_data || "",
    })) || [],
    risk_assessment: {
      summary: mainData.risk_assessment_summary || "",
      risks: risksRes.data?.map((r): AERisk => ({
        risk: r.risk_description || "",
        probability: r.probability || 0,
        impact: (r.impact || "Low") as AERisk['impact'],
        mitigation: r.mitigation || "",
      })) || [],
      overall_risk_score: mainData.risk_assessment_overall_risk_score || 0,
    },
    time_series_data: {
      engagement_over_time: engagementTimeRes.data?.map((e): AETimeSeriesDataPoint => ({
        date: e.date ? new Date(e.date).toLocaleDateString(undefined, {month:'short', day:'numeric'}) : "",
        value: e.value || 0,
      })) || [],
      deal_progress: dealProgressRes.data?.map((dp): AEDealProgressPoint => ({
        stage: dp.stage || "",
        days: dp.days || 0,
      })) || [],
    },
    opportunity_score: mainData.opportunity_score || 0,
  };
  return transformedData;
};

// Placeholder data for AE Dashboard
const mockAEData: AEDashboardData = {
  account_id: "ACC12345",
  company_name: "Acme Corp",
  analysis_date: new Date().toLocaleDateString(),
  account_summary: "Acme Corp is showing strong engagement signals but has raised concerns about pricing. Key contact: Jane Doe.",
  health_score: { current: 75, trend: "up", change_value: 5 },
  signal_analysis: {
    summary: "Positive sentiment overall, with specific interest in Feature X. Some budget constraints noted.",
    signals_by_priority: [
      { signal: "Expressed interest in Enterprise Plan", priority: "High", category: "Buying Intent", date_detected: "2025-05-10" },
      { signal: "Mentioned competitor Y's pricing", priority: "Medium", category: "Objection", date_detected: "2025-05-12" },
      { signal: "Requested demo for Add-on Z", priority: "High", category: "Engagement", date_detected: "2025-05-14" },
    ],
    sentiment_score: 80,
  },
  action_assessment: {
    summary: "Follow-up email sent post-demo. Next action: Schedule pricing discussion.",
    effective_actions: ["Sent detailed proposal", "Conducted successful demo"],
    ineffective_actions: ["Initial cold outreach email (low response)"],
    recommended_cadence: "Bi-weekly check-ins, immediate follow-up on questions.",
    engagement_metrics: { email_open_rate: 65, response_rate: 30, meeting_attendance: 90 },
  },
  tactical_recommendations: [
    { action: "Address pricing concerns with value proposition.", rationale: "Signal of budget constraint.", expected_outcome: "Overcome objection", timing: "Next call", priority: "High" },
    { action: "Share case study relevant to their industry.", rationale: "Builds credibility.", expected_outcome: "Increased confidence", timing: "This week", priority: "Medium" },
  ],
  talking_points: [
    { topic: "Feature X benefits", point: "Highlight how Feature X solved a similar problem for Client B.", supporting_data: "Client B saw 20% efficiency gain." },
    { topic: "Pricing Model", point: "Explain the ROI and long-term savings of the Enterprise Plan.", supporting_data: "Average ROI is 3x investment in 12 months." },
  ],
  risk_assessment: {
    summary: "Primary risk is budget constraint. Competitor Y is a minor threat.",
    risks: [
      { risk: "Budget limitations", probability: 0.6, impact: "High", mitigation: "Offer flexible payment terms or phased rollout." },
      { risk: "Competitor Y undercutting price", probability: 0.3, impact: "Medium", mitigation: "Emphasize superior features and support." },
    ],
    overall_risk_score: 65,
  },
  time_series_data: {
    engagement_over_time: [
      { date: "2025-04-01", value: 30 }, { date: "2025-04-15", value: 50 },
      { date: "2025-05-01", value: 70 }, { date: "2025-05-15", value: 75 },
    ],
    deal_progress: [
      { stage: "Prospecting", days: 10 }, { stage: "Qualification", days: 7 },
      { stage: "Proposal", days: 5 }, { stage: "Negotiation", days: 3 },
    ],
  },
  opportunity_score: 85,
};

const HealthScoreDisplay: React.FC<{ score: number; trend: "up" | "down" | "stable"; change: number }> = ({ score, trend, change }) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500";
  return (
    <div className="flex items-center">
      <span className={`text-3xl font-bold ${score > 70 ? 'text-green-600' : score > 40 ? 'text-yellow-500' : 'text-red-600'}`}>{score}</span>
      {TrendIcon && <TrendIcon className={`ml-2 h-5 w-5 ${trendColor}`} />}
      <span className={`ml-1 text-sm ${trendColor}`}>({change > 0 ? '+' : ''}{change})</span>
    </div>
  );
};

const AEDashboardPage: React.FC = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['aeDashboardData', ACCOUNT_ID_TO_FETCH],
    queryFn: () => fetchAEDashboardData(ACCOUNT_ID_TO_FETCH),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-24" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-red-700 mb-2">Error Loading Dashboard Data</h2>
          <p className="text-gray-600 text-center">
            There was an issue fetching the data for account ID: {ACCOUNT_ID_TO_FETCH}.<br />
            Please ensure you are logged in and the account exists.
          </p>
          <p className="mt-2 text-sm text-gray-500">Error: {error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (isSuccess && !data) {
     return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <List className="h-16 w-16 text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Data Available</h2>
          <p className="text-gray-600">No dashboard data found for account ID: {ACCOUNT_ID_TO_FETCH}.</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!data) {
    // This case should ideally be covered by isLoading, error, or !data after success.
    // If it's reached, it means something unexpected.
    return <DashboardLayout><p>No data available or unexpected state.</p></DashboardLayout>;
  }

  // If data is successfully fetched, render the dashboard:
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">AE Dashboard: {data.company_name}</h1>
        <p className="text-sm text-gray-500">Analysis Date: {data.analysis_date}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Account Health" description={`Overall Score: ${data.health_score.current}`}>
           <HealthScoreDisplay score={data.health_score.current} trend={data.health_score.trend} change={data.health_score.change_value} />
        </DashboardCard>
        <DashboardCard title="Opportunity Score">
          <div className="text-3xl font-bold text-blue-600">{data.opportunity_score}</div>
        </DashboardCard>
        <DashboardCard title="Overall Risk Score" description={`Based on ${data.risk_assessment.risks.length} identified risks`}>
           <div className={`text-3xl font-bold ${data.risk_assessment.overall_risk_score > 70 ? 'text-red-600' : data.risk_assessment.overall_risk_score > 40 ? 'text-yellow-500' : 'text-green-600'}`}>
            {data.risk_assessment.overall_risk_score}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Account Summary" className="mb-6">
        <p className="text-gray-700">{data.account_summary}</p>
      </DashboardCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Signal Analysis" description={`Sentiment: ${data.signal_analysis.sentiment_score}/100`}>
          <p className="text-sm text-gray-600 mb-2">{data.signal_analysis.summary}</p>
          {data.signal_analysis.signals_by_priority.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {data.signal_analysis.signals_by_priority.map((s, i) => (
                <li key={i} className="flex items-center">
                  {s.priority === "High" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />}
                  {s.priority === "Medium" && <CheckCircle className="h-4 w-4 mr-2 text-yellow-500 flex-shrink-0" />}
                  {s.priority === "Low" && <List className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />}
                  <span className="font-medium mr-1">{s.signal}</span> ({s.category}) - {s.date_detected}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No signals detected.</p>
          )}
        </DashboardCard>

        <DashboardCard title="Action Assessment">
           <p className="text-sm text-gray-600 mb-2">{data.action_assessment.summary}</p>
           <h4 className="font-semibold text-gray-700 mt-2">Engagement Metrics:</h4>
           <p className="text-sm">Open: {data.action_assessment.engagement_metrics.email_open_rate}% | Response: {data.action_assessment.engagement_metrics.response_rate}% | Attendance: {data.action_assessment.engagement_metrics.meeting_attendance}%</p>
           <h4 className="font-semibold text-gray-700 mt-2">Effective Actions:</h4>
           {data.action_assessment.effective_actions.length > 0 ? (
            <ul className="list-disc list-inside text-sm pl-2">{data.action_assessment.effective_actions.map((a, i) => <li key={i}>{a}</li>)}</ul>
           ) : (
            <p className="text-sm text-gray-500">No effective actions logged.</p>
           )}
           <h4 className="font-semibold text-gray-700 mt-2">Ineffective Actions:</h4>
           {data.action_assessment.ineffective_actions.length > 0 ? (
            <ul className="list-disc list-inside text-sm pl-2">{data.action_assessment.ineffective_actions.map((a, i) => <li key={i}>{a}</li>)}</ul>
            ) : (
            <p className="text-sm text-gray-500">No ineffective actions logged.</p>
           )}
            <h4 className="font-semibold text-gray-700 mt-2">Recommended Cadence:</h4>
            <p className="text-sm">{data.action_assessment.recommended_cadence || "N/A"}</p>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PlaceholderChart data={data.time_series_data.engagement_over_time.map(d => ({name: d.date, value: d.value}))} title="Engagement Over Time"/>
        <PlaceholderChart data={data.time_series_data.deal_progress.map(d => ({name: d.stage, value: d.days}))} title="Deal Progress (Days in Stage)"/>
      </div>

      <DashboardCard title="Tactical Recommendations" className="mb-6">
        {data.tactical_recommendations.length > 0 ? (
          <ul className="space-y-2">
            {data.tactical_recommendations.map((r, i) => (
              <li key={i} className="p-2 border rounded-md bg-gray-50">
                <p className="font-semibold text-gray-800 flex items-center">
                  {r.priority === "High" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />}
                  {r.priority === "Medium" && <CheckCircle className="h-4 w-4 mr-2 text-yellow-500 flex-shrink-0" />}
                   {r.action} ({r.priority})
                </p>
                <p className="text-sm text-gray-600">Rationale: {r.rationale}</p>
                <p className="text-sm text-gray-600">Expected Outcome: {r.expected_outcome} (Timing: {r.timing})</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tactical recommendations available.</p>
        )}
      </DashboardCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Talking Points">
          {data.talking_points.length > 0 ? (
            <ul className="space-y-2">
              {data.talking_points.map((tp, i) => (
                <li key={i} className="p-2 border rounded-md bg-gray-50">
                  <p className="font-semibold text-gray-800 flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />{tp.topic}</p>
                  <p className="text-sm text-gray-600">{tp.point}</p>
                  <p className="text-xs text-gray-500">Data: {tp.supporting_data}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No talking points available.</p>
          )}
        </DashboardCard>

        <DashboardCard title="Risk Assessment">
          <p className="text-sm text-gray-600 mb-2">{data.risk_assessment.summary}</p>
          {data.risk_assessment.risks.length > 0 ? (
            <ul className="space-y-2">
              {data.risk_assessment.risks.map((r, i) => (
                <li key={i} className="p-2 border rounded-md bg-red-50">
                  <p className="font-semibold text-red-700 flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-2 flex-shrink-0" />
                      {r.risk} (Impact: {r.impact}, Prob: {r.probability * 100}%)
                  </p>
                  <p className="text-sm text-red-600">Mitigation: {r.mitigation}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No risks identified.</p>
          )}
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default AEDashboardPage;
