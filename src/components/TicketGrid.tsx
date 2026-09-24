import React from 'react';
import { Ticket as TicketType } from '../types';
import { TicketItem } from './TicketItem';

interface TicketGridProps {
  tickets: TicketType[];
  selectedTicketIds: string[];
  onSelectTicket: (ticket: TicketType) => void;
}

export const TicketGrid: React.FC<TicketGridProps> = ({ tickets, selectedTicketIds, onSelectTicket }) => {
  return (
    <div className="ticket-grid">
      {tickets.map(ticket => (
        <TicketItem 
          key={ticket.id} 
          ticket={ticket} 
          isSelected={selectedTicketIds.includes(ticket.id)}
          onSelect={onSelectTicket}
        />
      ))}
    </div>
  );
};
