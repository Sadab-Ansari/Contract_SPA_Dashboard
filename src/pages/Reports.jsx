import React from 'react';
import { Card } from '@/components/ui/card';
import { FileBarChart, Download, Calendar, Users } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contract Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive reports for compliance, analysis, and stakeholders
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileBarChart className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Automated Reporting Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            Generate detailed reports with customizable templates, automated scheduling, 
            and export options for all your contract management needs.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-left">
              <Download className="h-4 w-4 text-primary" />
              PDF & Excel exports
            </div>
            <div className="flex items-center gap-2 text-left">
              <Calendar className="h-4 w-4 text-success" />
              Scheduled reports
            </div>
            <div className="flex items-center gap-2 text-left">
              <Users className="h-4 w-4 text-warning" />
              Stakeholder sharing
            </div>
            <div className="flex items-center gap-2 text-left">
              <FileBarChart className="h-4 w-4 text-accent-foreground" />
              Custom templates
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;