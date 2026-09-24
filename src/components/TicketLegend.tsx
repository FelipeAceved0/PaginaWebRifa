import React from 'react';

export const TicketLegend: React.FC = () => {
  return (
    <div className="flex gap-md flex-wrap items-center justify-center mt-md mb-lg p-sm" style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--border-radius)', border: '1px solid #e2e8f0' }}>
      <div className="flex items-center gap-xs">
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: '#f1f5f9' }} />
        <span className="text-sm">Disponible</span>
      </div>
      <div className="flex items-center gap-xs">
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-primary)' }} />
        <span className="text-sm">Seleccionado</span>
      </div>
      <div className="flex items-center gap-xs">
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'transparent', border: '1px dashed #cbd5e1' }} />
        <span className="text-sm">Reservado</span>
      </div>
      <div className="flex items-center gap-xs" style={{ opacity: 0.5 }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'transparent', border: '1px solid #e2e8f0' }} />
        <span className="text-sm">Vendido</span>
      </div>
    </div>
  );
};
