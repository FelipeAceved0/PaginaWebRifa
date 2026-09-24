import type { Ticket } from '../types';
import { ShoppingCart } from 'lucide-react';

interface PurchaseSummaryProps {
  selectedTickets: Ticket[];
  onContinue: () => void;
  isMobile?: boolean;
}

export const PurchaseSummary = ({ selectedTickets, onContinue, isMobile = false }: PurchaseSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const total = selectedTickets.reduce((acc, t) => acc + t.price, 0);

  if (selectedTickets.length === 0 && isMobile) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="flex justify-between items-center" style={{ width: '100%' }}>
        <div>
          <div className="text-sm font-semibold text-muted mb-xs">{selectedTickets.length} {selectedTickets.length === 1 ? 'número' : 'números'}</div>
          <div className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</div>
        </div>
        <button className="btn btn-primary" onClick={onContinue} disabled={selectedTickets.length === 0}>
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className="surface" style={{ border: '1px solid #e2e8f0', padding: 'var(--spacing-lg)' }}>
      <h3 className="mb-md flex items-center gap-sm" style={{ fontSize: '1.25rem' }}>
        Tu Selección
      </h3>
      
      {selectedTickets.length > 0 ? (
        <div className="mb-md">
          <p className="text-sm text-muted mb-xs">Números elegidos:</p>
          <div className="font-mono font-semibold text-lg" style={{ color: 'var(--color-primary)', maxHeight: '160px', overflowY: 'auto', lineHeight: '1.4' }}>
            {selectedTickets.map(t => `#${String(t.number).padStart(3, '0')}`).join(', ')}
          </div>
        </div>
      ) : (
        <p className="text-muted text-sm mb-lg">Aún no has seleccionado ningún número.</p>
      )}
      
      <div className="flex justify-between items-center mb-lg pt-md" style={{ borderTop: '1px solid #e2e8f0' }}>
        <span className="font-semibold text-muted">{selectedTickets.length} {selectedTickets.length === 1 ? 'número' : 'números'}</span>
        <span className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
      </div>
      
      <button className="btn btn-primary btn-block" onClick={onContinue} disabled={selectedTickets.length === 0} style={{ padding: '1rem', fontSize: '1.125rem' }}>
        Continuar al pago
      </button>
    </div>
  );
};
