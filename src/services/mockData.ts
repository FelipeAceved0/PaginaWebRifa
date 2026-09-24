import { Raffle, Ticket, TicketStatus, Purchase } from '../types';

export const mockRaffle: Raffle = {
  id: 'r_1',
  title: 'Gran Sorteo Tecnológico',
  description: 'Participa por un increíble set de tecnología para tu setup de trabajo o gaming. Incluye Macbook Pro, Monitor 4K y periféricos premium.',
  mainImageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
  ticketPrice: 5000,
  drawDate: '2026-10-15T20:00:00Z',
  totalTickets: 200,
  availableTickets: 145,
  prizes: [
    {
      id: 'p_1',
      title: 'MacBook Pro 14" M3',
      position: 1,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p_2',
      title: 'Monitor LG UltraFine 4K',
      position: 2,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'p_3',
      title: 'Teclado Keychron + Mouse Logitech MX',
      position: 3,
      imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400'
    }
  ]
};

const generateMockTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  for (let i = 1; i <= 200; i++) {
    let status: TicketStatus = 'AVAILABLE';
    
    // Randomize some statuses for the demo
    if (i % 7 === 0) status = 'SOLD';
    else if (i % 13 === 0) status = 'RESERVED';
    else if (i % 31 === 0) status = 'SOLD';
    
    tickets.push({
      id: `t_${i}`,
      number: i,
      status,
      price: mockRaffle.ticketPrice
    });
  }
  return tickets;
};

export const mockTickets: Ticket[] = generateMockTickets();

export const mockPurchases: Purchase[] = [
  {
    id: 'pur_1',
    tickets: [mockTickets[6], mockTickets[13]], // Example
    participant: {
      name: 'Juan Pérez',
      rut: '12.345.678-9',
      email: 'juan@example.com',
      phone: '+56912345678'
    },
    totalAmount: 10000,
    status: 'PAID',
    createdAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'pur_2',
    tickets: [mockTickets[20]], 
    participant: {
      name: 'María Silva',
      rut: '18.765.432-1',
      email: 'maria@example.com',
      phone: '+56987654321'
    },
    totalAmount: 5000,
    status: 'PAID',
    createdAt: '2026-09-21T15:30:00Z'
  }
];
