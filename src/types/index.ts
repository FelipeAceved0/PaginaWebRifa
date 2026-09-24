export type TicketStatus = 'AVAILABLE' | 'SELECTED' | 'SOLD' | 'RESERVED';

export interface Ticket {
  id: string;
  number: number;
  status: TicketStatus;
  price: number;
}

export interface Prize {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  position: number; // 1 for first prize, 2 for second, etc.
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  mainImageUrl: string;
  ticketPrice: number;
  drawDate: string;
  totalTickets: number;
  availableTickets: number;
  prizes: Prize[];
}

export interface Participant {
  name: string;
  rut: string;
  email: string;
  phone: string;
}

export interface Purchase {
  id: string;
  tickets: Ticket[];
  participant: Participant;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'REJECTED';
  createdAt: string;
}
