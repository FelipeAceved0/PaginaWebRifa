import React from 'react';
import { Purchase } from '../types';
import { StatusBadge } from './StatusBadge';

interface SalesTableProps {
  purchases: Purchase[];
}

export const SalesTable: React.FC<SalesTableProps> = ({ purchases }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusType = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'REJECTED': return 'error';
      default: return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID': return 'Pagado';
      case 'PENDING': return 'Pendiente';
      case 'REJECTED': return 'Rechazado';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th className="p-sm text-muted font-semibold">Números</th>
            <th className="p-sm text-muted font-semibold">Comprador</th>
            <th className="p-sm text-muted font-semibold">Monto</th>
            <th className="p-sm text-muted font-semibold">Estado</th>
            <th className="p-sm text-muted font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td className="p-sm font-semibold">
                {purchase.tickets.map(t => `#${String(t.number).padStart(3, '0')}`).join(', ')}
              </td>
              <td className="p-sm">
                <div>{purchase.participant.name}</div>
                <div className="text-xs text-muted">{purchase.participant.rut}</div>
              </td>
              <td className="p-sm font-medium">{formatCurrency(purchase.totalAmount)}</td>
              <td className="p-sm">
                <StatusBadge status={getStatusText(purchase.status)} type={getStatusType(purchase.status)} />
              </td>
              <td className="p-sm text-sm text-muted">{formatDate(purchase.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
