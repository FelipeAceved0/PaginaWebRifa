import React from 'react';

type BadgeType = 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  status: string;
  type: BadgeType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  return (
    <span className={`status-text status-${type}`}>
      {status}
    </span>
  );
};
