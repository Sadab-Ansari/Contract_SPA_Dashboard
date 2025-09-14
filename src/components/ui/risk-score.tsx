import React from 'react';
import { cn } from '@/lib/utils';

interface RiskScoreProps {
  score: number;
  className?: string;
}

export const RiskScore: React.FC<RiskScoreProps> = ({ score, className }) => {
  const getRiskConfig = (score: number) => {
    if (score <= 2) {
      return {
        label: 'Low',
        className: 'risk-score risk-low'
      };
    } else if (score <= 3.5) {
      return {
        label: 'Medium',
        className: 'risk-score risk-medium'
      };
    } else if (score <= 4.5) {
      return {
        label: 'High',
        className: 'risk-score risk-high'
      };
    } else {
      return {
        label: 'Critical',
        className: 'risk-score risk-critical'
      };
    }
  };

  const config = getRiskConfig(score);

  return (
    <div className="flex items-center gap-2">
      <span className={cn(config.className, className)}>
        {config.label}
      </span>
      <span className="text-sm text-muted-foreground">
        {score.toFixed(1)}
      </span>
    </div>
  );
};