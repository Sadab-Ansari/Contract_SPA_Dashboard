import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { StatusBadge } from '@/components/ui/status-badge';
import { RiskScore } from '@/components/ui/risk-score';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  DollarSign, 
  FileText,
  AlertTriangle,
  Lightbulb,
  Eye,
  ChevronRight,
  Copy,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

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
  clauses: Array<{
    id: string;
    title: string;
    summary: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  insights: Array<{
    type: 'risk' | 'recommendation';
    severity: 'low' | 'medium' | 'high';
    title: string;
    description: string;
  }>;
  evidence: Array<{
    snippet: string;
    relevance: number;
    page: number;
    section: string;
  }>;
}

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try different possible paths for the JSON file
        const possiblePaths = ['/contracts.json', './contracts.json', '/public/contracts.json'];
        let response: Response | null = null;
        let lastError: Error | null = null;
        
        for (const path of possiblePaths) {
          try {
            const fetchResponse = await fetch(path);
            if (fetchResponse.ok) {
              response = fetchResponse;
              break;
            }
          } catch (err) {
            lastError = err as Error;
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(`Failed to fetch contract data. ${lastError ? lastError.message : 'No valid data source found.'}`);
        }
        
        const data = await response.json();
        const foundContract = data.contracts?.find((c: Contract) => c.id === id);
        
        if (!foundContract) {
          throw new Error(`Contract with ID "${id}" not found in the database.`);
        }
        
        setContract(foundContract);
      } catch (err) {
        console.error('Error fetching contract:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchContract();
    } else {
      setError('No contract ID provided');
      setIsLoading(false);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    });
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'low': return <Lightbulb className="h-5 w-5 text-success" />;
      default: return <Lightbulb className="h-5 w-5 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-muted-foreground">Loading contract details...</span>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold mb-2">
          {error || 'Contract not found'}
        </h2>
        <p className="text-muted-foreground mb-6">
          The contract you're looking for doesn't exist or couldn't be loaded.
        </p>
        <Link to="/dashboard">
          <EnhancedButton variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </EnhancedButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <EnhancedButton
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </EnhancedButton>
        
        <div className="h-4 w-px bg-border" />
        
        <div>
          <h1 className="text-2xl font-bold">{contract.name}</h1>
          <p className="text-muted-foreground">{contract.type}</p>
        </div>
      </div>

      {/* Contract Metadata */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Parties
            </h3>
            <div className="space-y-1">
              {contract.parties.map((party, index) => (
                <p key={index} className="text-sm">{party}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Duration
            </h3>
            <p className="text-sm">Start: {formatDate(contract.startDate)}</p>
            <p className="text-sm">End: {formatDate(contract.expiryDate)}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Status & Risk</h3>
            <div className="space-y-2">
              <StatusBadge status={contract.status} />
              <RiskScore score={contract.riskScore} />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Contract Value
            </h3>
            <p className="text-lg font-semibold">
              {contract.value > 0 ? formatCurrency(contract.value) : 'Not specified'}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Clauses Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Clauses
            </h2>
            <div className="space-y-4">
              {contract.clauses.map((clause) => (
                <Card key={clause.id} className="p-6 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{clause.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        getRiskLevelColor(clause.riskLevel),
                        "bg-current/10"
                      )}>
                        {clause.riskLevel.charAt(0).toUpperCase() + clause.riskLevel.slice(1)} Risk
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(clause.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{clause.summary}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Insights
            </h2>
            <div className="space-y-4">
              {contract.insights.map((insight, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(insight.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          insight.type === 'risk' ? 'bg-destructive-light text-destructive' : 'bg-success-light text-success'
                        )}>
                          {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Evidence Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Evidence
              </h2>
              <EnhancedButton
                variant="ghost"
                size="sm"
                onClick={() => setEvidenceOpen(!evidenceOpen)}
              >
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  evidenceOpen && "rotate-90"
                )} />
              </EnhancedButton>
            </div>

            {(evidenceOpen || contract.evidence.length <= 3) && (
              <div className="space-y-4">
                {contract.evidence.map((evidence, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {evidence.section} • Page {evidence.page}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {Math.round(evidence.relevance * 100)}% relevant
                        </span>
                        <EnhancedButton
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(evidence.snippet)}
                        >
                          <Copy className="h-3 w-3" />
                        </EnhancedButton>
                      </div>
                    </div>
                    <p className="text-sm bg-muted/30 p-3 rounded italic">
                      "{evidence.snippet}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!evidenceOpen && contract.evidence.length > 3 && (
              <p className="text-sm text-muted-foreground">
                {contract.evidence.length} evidence snippets available. Click to expand.
              </p>
            )}
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Actions</h3>
            <div className="space-y-3">
              <EnhancedButton variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Original Document
              </EnhancedButton>
              <EnhancedButton variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </EnhancedButton>
              <EnhancedButton variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Set Renewal Reminder
              </EnhancedButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;