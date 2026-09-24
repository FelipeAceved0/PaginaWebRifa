import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RaffleHeader } from '../components/RaffleHeader';
import { PurchaseSummary } from '../components/PurchaseSummary';
import { ParticipantForm } from '../components/ParticipantForm';
import { getTickets, createReservation } from '../services/api';
import { Ticket, Participant } from '../types';
import { ArrowLeft } from 'lucide-react';

export const Checkout: React.FC = () => {
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const selectedIdsStr = sessionStorage.getItem('selectedTickets');
        if (!selectedIdsStr) {
          navigate('/');
          return;
        }
        
        const selectedIds: string[] = JSON.parse(selectedIdsStr);
        if (selectedIds.length === 0) {
          navigate('/');
          return;
        }

        const allTickets = await getTickets();
        const tickets = allTickets.filter(t => selectedIds.includes(t.id));
        setSelectedTickets(tickets);
      } catch (error) {
        console.error('Error loading checkout:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [navigate]);

  const handleSubmitParticipant = async (participant: Participant) => {
    setIsSubmitting(true);
    try {
      const ticketIds = selectedTickets.map(t => t.id);
      const purchase = await createReservation(ticketIds, participant);
      
      // Navigate to payment simulation
      // In a real app, we would redirect to Mercado Pago here using a generated preferenceId
      navigate(`/payment-result/${purchase.id}?mock=pending`);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Hubo un error al procesar tu reserva. Intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: '100vh' }}>
        <p className="text-lg text-muted">Cargando resumen...</p>
      </div>
    );
  }

  return (
    <div>
      <RaffleHeader />
      <main className="container mt-lg mb-xl">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-xs text-muted mb-md"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ArrowLeft size={16} /> Volver a la rifa
        </button>
        
        <h1 className="mb-lg">Completar Compra</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <div>
            <ParticipantForm onSubmit={handleSubmitParticipant} isSubmitting={isSubmitting} />
          </div>
          <div>
            <PurchaseSummary 
              selectedTickets={selectedTickets} 
              onContinue={() => {}} // Disabled in this view
            />
            
            <div className="surface p-md mt-md flex flex-col items-center justify-center text-center" style={{ border: '1px solid #e2e8f0' }}>
              <div className="text-sm font-semibold mb-sm">Pago seguro procesado por</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#009ee3' }}>mercado pago</div>
              <p className="text-xs text-muted mt-sm">Esta es una simulación visual. No se realizarán cargos reales.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
