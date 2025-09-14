import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { StatusBadge } from '@/components/ui/status-badge';
import { RiskScore } from '@/components/ui/risk-score';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Calendar,
  Users,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ContractsTableProps {
  contracts: Contract[];
  isLoading?: boolean;
  error?: string;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  isLoading = false,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 10;

  // Filter and search contracts
  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = 
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.parties.some(party => 
          party.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
      
      const matchesRisk = riskFilter === 'all' || (() => {
        if (riskFilter === 'low') return contract.riskScore <= 2;
        if (riskFilter === 'medium') return contract.riskScore > 2 && contract.riskScore <= 3.5;
        if (riskFilter === 'high') return contract.riskScore > 3.5;
        return true;
      })();

      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [contracts, searchTerm, statusFilter, riskFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, riskFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-muted-foreground">Loading contracts...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <div className="text-destructive mb-2">Error loading contracts</div>
        <p className="text-muted-foreground">{error}</p>
      </Card>
    );
  }

  if (contracts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-lg font-semibold mb-2">No contracts yet</h3>
        <p className="text-muted-foreground">
          Upload your first contract to get started with AI-powered contract analysis.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by contract name or parties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <EnhancedButton
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-muted")}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </EnhancedButton>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
          <div>
            Showing {paginatedContracts.length} of {filteredContracts.length} contracts
          </div>
          {(searchTerm || statusFilter !== 'all' || riskFilter !== 'all') && (
            <EnhancedButton
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRiskFilter('all');
              }}
            >
              Clear filters
            </EnhancedButton>
          )}
        </div>
      </Card>

      {/* Contracts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Contract</th>
                <th className="text-left p-4 font-medium">Parties</th>
                <th className="text-left p-4 font-medium">Expiry Date</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Risk Score</th>
                <th className="text-left p-4 font-medium">Value</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContracts.map((contract) => (
                <tr 
                  key={contract.id} 
                  className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => window.location.href = `/contracts/${contract.id}`}
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground hover:text-primary transition-colors">
                        {contract.name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {contract.type}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {contract.parties.slice(0, 2).map((party, index) => (
                        <div key={index} className="text-sm flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          {party}
                        </div>
                      ))}
                      {contract.parties.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{contract.parties.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {formatDate(contract.expiryDate)}
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="p-4">
                    <RiskScore score={contract.riskScore} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      {contract.value > 0 ? formatCurrency(contract.value) : 'N/A'}
                    </div>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Link to={`/contracts/${contract.id}`}>
                      <EnhancedButton variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </EnhancedButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </EnhancedButton>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};