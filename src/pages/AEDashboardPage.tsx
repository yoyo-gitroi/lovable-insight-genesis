
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import PlaceholderChart from '@/components/charts/PlaceholderChart';
import { AEDashboardData } from '@/types/dashboard';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, List, MessageSquare, ShieldAlert, CalendarDays } from 'lucide-react';

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
  const data = mockAEData;

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
          <ul className="space-y-1 text-sm">
            {data.signal_analysis.signals_by_priority.map((s, i) => (
              <li key={i} className="flex items-center">
                {s.priority === "High" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />}
                {s.priority === "Medium" && <CheckCircle className="h-4 w-4 mr-2 text-yellow-500" />}
                {s.priority === "Low" && <List className="h-4 w-4 mr-2 text-green-500" />}
                <span className="font-medium">{s.signal}</span> ({s.category}) - {s.date_detected}
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Action Assessment">
           <p className="text-sm text-gray-600 mb-2">{data.action_assessment.summary}</p>
           <h4 className="font-semibold text-gray-700 mt-2">Engagement Metrics:</h4>
           <p className="text-sm">Open: {data.action_assessment.engagement_metrics.email_open_rate}% | Response: {data.action_assessment.engagement_metrics.response_rate}% | Attendance: {data.action_assessment.engagement_metrics.meeting_attendance}%</p>
           <h4 className="font-semibold text-gray-700 mt-2">Effective Actions:</h4>
           <ul className="list-disc list-inside text-sm pl-2">{data.action_assessment.effective_actions.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PlaceholderChart data={data.time_series_data.engagement_over_time.map(d => ({name: new Date(d.date).toLocaleDateString(undefined, {month:'short', day:'numeric'}), value: d.value}))} title="Engagement Over Time"/>
        <PlaceholderChart data={data.time_series_data.deal_progress.map(d => ({name: d.stage, value: d.days}))} title="Deal Progress (Days in Stage)"/>
      </div>

      <DashboardCard title="Tactical Recommendations" className="mb-6">
        <ul className="space-y-2">
          {data.tactical_recommendations.map((r, i) => (
            <li key={i} className="p-2 border rounded-md bg-gray-50">
              <p className="font-semibold text-gray-800 flex items-center">
                {r.priority === "High" && <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />}
                {r.priority === "Medium" && <CheckCircle className="h-4 w-4 mr-2 text-yellow-500" />}
                 {r.action} ({r.priority})
              </p>
              <p className="text-sm text-gray-600">Rationale: {r.rationale}</p>
              <p className="text-sm text-gray-600">Expected Outcome: {r.expected_outcome} (Timing: {r.timing})</p>
            </li>
          ))}
        </ul>
      </DashboardCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Talking Points">
          <ul className="space-y-2">
            {data.talking_points.map((tp, i) => (
              <li key={i} className="p-2 border rounded-md bg-gray-50">
                <p className="font-semibold text-gray-800 flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-blue-500" />{tp.topic}</p>
                <p className="text-sm text-gray-600">{tp.point}</p>
                <p className="text-xs text-gray-500">Data: {tp.supporting_data}</p>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Risk Assessment">
          <p className="text-sm text-gray-600 mb-2">{data.risk_assessment.summary}</p>
          <ul className="space-y-2">
            {data.risk_assessment.risks.map((r, i) => (
              <li key={i} className="p-2 border rounded-md bg-red-50">
                <p className="font-semibold text-red-700 flex items-center">
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    {r.risk} (Impact: {r.impact}, Prob: {r.probability * 100}%)
                </p>
                <p className="text-sm text-red-600">Mitigation: {r.mitigation}</p>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default AEDashboardPage;
