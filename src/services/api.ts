import { Raffle, Ticket, Purchase, Participant } from '../types';
import { mockRaffle, mockTickets, mockPurchases } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRaffle = async (): Promise<Raffle> => {
  await delay(500);
  return mockRaffle;
};

export const getTickets = async (): Promise<Ticket[]> => {
  await delay(600);
  return [...mockTickets];
};

export const createReservation = async (ticketIds: string[], participant: Participant): Promise<Purchase> => {
  await delay(1000);
  
  // In a real app, this would validate if tickets are still available
  // and create a pending purchase in the DB
  const selectedTickets = mockTickets.filter(t => ticketIds.includes(t.id));
  
  const newPurchase: Purchase = {
    id: `pur_mock_${Date.now()}`,
    tickets: selectedTickets,
    participant,
    totalAmount: selectedTickets.length * mockRaffle.ticketPrice,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };
  
  return newPurchase;
};

export const getPurchase = async (purchaseId: string): Promise<Purchase | null> => {
  await delay(400);
  // Mock finding the purchase, if it's the mock id, just return a dummy
  if (purchaseId.startsWith('pur_mock_')) {
    return {
      id: purchaseId,
      tickets: [mockTickets[0], mockTickets[1]], // Fake tickets for the mock
      participant: { name: 'Mock User', rut: '1.111.111-1', email: 'mock@mock.com', phone: '123' },
      totalAmount: mockRaffle.ticketPrice * 2,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
  }
  
  const purchase = mockPurchases.find(p => p.id === purchaseId);
  return purchase || null;
};

export const getPaymentStatus = async (purchaseId: string): Promise<'PENDING' | 'PAID' | 'REJECTED'> => {
  await delay(1500);
  // Simulate a successful payment 90% of the time
  const isSuccess = Math.random() > 0.1;
  return isSuccess ? 'PAID' : 'REJECTED';
};

export const getDashboardStats = async () => {
  await delay(800);
  return {
    totalTickets: mockRaffle.totalTickets,
    availableTickets: mockTickets.filter(t => t.status === 'AVAILABLE').length,
    reservedTickets: mockTickets.filter(t => t.status === 'RESERVED').length,
    soldTickets: mockTickets.filter(t => t.status === 'SOLD').length,
    totalRevenue: mockPurchases.reduce((acc, p) => acc + p.totalAmount, 0),
    recentPurchases: mockPurchases
  };
};
