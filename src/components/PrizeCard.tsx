import React from 'react';
import { Prize } from '../types';
import { Trophy } from 'lucide-react';

interface PrizeCardProps {
  prize: Prize;
}

export const PrizeCard: React.FC<PrizeCardProps> = ({ prize }) => {
  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {prize.imageUrl && (
        <div style={{
          height: '160px',
          backgroundImage: `url(${prize.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid #e2e8f0'
        }} />
      )}
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center gap-sm mb-sm" style={{ color: 'var(--color-primary)' }}>
          <Trophy size={20} />
          <span className="font-bold text-sm">Premio #{prize.position}</span>
        </div>
        <h3 className="mb-xs" style={{ fontSize: '1.25rem' }}>{prize.title}</h3>
        {prize.description && <p className="text-sm">{prize.description}</p>}
      </div>
    </div>
  );
};
