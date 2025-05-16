
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component (shadcn/ui)
import { ArrowRight, BarChartBig, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Welcome to GTM Intelligence
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Unlock actionable insights from your sales data. Navigate to your tailored dashboard view.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link to="/ae-dashboard" className="block group">
          <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:bg-slate-700 transition-all duration-300 transform hover:scale-105">
            <User className="h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-slate-100">AE Dashboard</h2>
            <p className="text-slate-400 mb-4">
              Account-specific insights, tactical recommendations, and risk assessments to close more deals.
            </p>
            <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 group-hover:bg-blue-400 group-hover:text-slate-900">
              Go to AE View <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Link>

        <Link to="/cro-dashboard" className="block group">
          <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:bg-slate-700 transition-all duration-300 transform hover:scale-105">
            <BarChartBig className="h-12 w-12 text-indigo-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-slate-100">CRO Dashboard</h2>
            <p className="text-slate-400 mb-4">
              Strategic overview of revenue performance, sales activities, team performance, and market signals.
            </p>
            <Button variant="outline" className="bg-transparent border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-slate-900 group-hover:bg-indigo-400 group-hover:text-slate-900">
              Go to CRO View <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Link>
      </div>

      <footer className="mt-16 text-center text-slate-500 text-sm">
        <p>Powered by Lovable | &copy; {new Date().getFullYear()} GTM Intelligence Inc.</p>
        <p className="mt-1">Remember to connect your Google Sheets data via Supabase for live insights!</p>
      </footer>
    </div>
  );
};

export default Index;
