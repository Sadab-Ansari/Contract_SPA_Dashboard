import React, { useState, useEffect } from 'react';
import { ContractsTable } from '@/components/contracts/ContractsTable';
import { UploadModal } from '@/components/modals/UploadModal';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Upload
} from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

interface Contract {
  id: string;
  name: string;
  parties: string[];
  startDate: string;
  expiryDate: string;
  status: 'active' | 'pending' | 'expired' | 'expiring_soon';
  riskScore: number;
  value: number;
  type: string;
}

const Dashboard: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/contracts.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contracts');
        }
        
        const data = await response.json();
        setContracts(data.contracts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter(c => c.status === 'active').length;
    const expiringSoon = contracts.filter(c => c.status === 'expiring_soon').length;
    const highRisk = contracts.filter(c => c.riskScore > 3.5).length;
    const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);

    return { total, active, expiringSoon, highRisk, totalValue };
  }, [contracts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage and analyze your contracts with AI-powered insights
          </p>
        </div>
        
        <EnhancedButton
          variant="premium"
          size="lg"
          onClick={() => setUploadModalOpen(true)}
          className="w-full lg:w-auto"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Contract
        </EnhancedButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Contracts</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Active Contracts</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.expiringSoon}</p>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.highRisk}</p>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Total Value Card */}
      <Card className="p-6 bg-gradient-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Contract Value</h3>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(stats.totalValue)}
            </p>
          </div>
          <div className="p-4 bg-primary/10 rounded-full">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
      </Card>

      {/* Contracts Table */}
      <ContractsTable 
        contracts={contracts}
        isLoading={isLoading}
        error={error}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;