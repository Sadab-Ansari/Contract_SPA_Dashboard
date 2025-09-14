import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'expired' | 'expiring_soon';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200'
        };
      case 'expired':
        return {
          label: 'Expired',
          className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200'
        };
      case 'expiring_soon':
        return {
          label: 'Expiring Soon',
          className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200'
        };
      default:
        return {
          label: 'Unknown',
          className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(config.className, className)}>
      {config.label}
    </span>
  );
};