import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export const RaffleHeader: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid #e2e8f0',
      padding: 'var(--spacing-md) 0',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-sm" style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <Ticket size={24} />
          <span>RifaPro</span>
        </Link>
        <nav>
          <Link to="/admin" className="text-sm font-semibold text-muted">Admin</Link>
        </nav>
      </div>
    </header>
  );
};
