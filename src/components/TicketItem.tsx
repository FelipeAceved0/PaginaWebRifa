import React from 'react';
import { Ticket as TicketType } from '../types';

interface TicketItemProps {
  ticket: TicketType;
  isSelected: boolean;
  onSelect: (ticket: TicketType) => void;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticket, isSelected, onSelect }) => {
  const getStatusClass = () => {
    if (isSelected) return 'ticket-selected';
    if (ticket.status === 'AVAILABLE') return 'ticket-available';
    if (ticket.status === 'SOLD') return 'ticket-sold';
    if (ticket.status === 'RESERVED') return 'ticket-reserved';
    return '';
  };

  const isClickable = ticket.status === 'AVAILABLE';

  return (
    <button
      type="button"
      disabled={!isClickable}
      className={`ticket-btn ${getStatusClass()}`}
      onClick={() => isClickable && onSelect(ticket)}
      style={{
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--border-radius)',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: '1px solid',
        cursor: isClickable ? 'pointer' : 'not-allowed',
        transition: 'all 0.2s ease',
      }}
    >
      {String(ticket.number).padStart(3, '0')}
    </button>
  );
};
