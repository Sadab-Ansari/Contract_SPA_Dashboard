import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const Insights: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contract Insights</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered analytics and insights from your contract portfolio
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <BarChart3 className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Advanced Insights Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            We're building powerful analytics to help you understand contract patterns, 
            risk trends, and optimization opportunities across your entire portfolio.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-left">
              <TrendingUp className="h-4 w-4 text-success" />
              Risk trending analysis
            </div>
            <div className="flex items-center gap-2 text-left">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Anomaly detection
            </div>
            <div className="flex items-center gap-2 text-left">
              <Target className="h-4 w-4 text-primary" />
              Performance metrics
            </div>
            <div className="flex items-center gap-2 text-left">
              <BarChart3 className="h-4 w-4 text-accent-foreground" />
              Portfolio overview
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Insights;