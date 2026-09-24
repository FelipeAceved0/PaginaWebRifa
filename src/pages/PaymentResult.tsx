import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { RaffleHeader } from '../components/RaffleHeader';
import { getPurchase, getPaymentStatus } from '../services/api';
import { Purchase } from '../types';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';

export const PaymentResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const mockStatus = searchParams.get('mock'); // For testing/prototyping
  
  const navigate = useNavigate();
  
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'PAID' | 'REJECTED' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!id) return;
      
      try {
        const purchaseData = await getPurchase(id);
        setPurchase(purchaseData);
        
        if (mockStatus === 'pending') {
          // Simulate the transition from pending to actual result
          setPaymentStatus('PENDING');
          const finalStatus = await getPaymentStatus(id);
          setPaymentStatus(finalStatus);
          
          if (finalStatus === 'PAID') {
            sessionStorage.removeItem('selectedTickets'); // Clear cart
          }
        } else {
          setPaymentStatus(purchaseData?.status || 'PENDING');
        }
      } catch (error) {
        console.error('Error fetching payment result:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, [id, mockStatus]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center" style={{ minHeight: '100vh', gap: 'var(--spacing-md)' }}>
        <Clock size={48} className="text-muted" style={{ animation: 'spin 2s linear infinite' }} />
        <p className="text-lg font-semibold">Procesando pago con Mercado Pago...</p>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div>
        <RaffleHeader />
        <main className="container mt-xl text-center">
          <h2>Compra no encontrada</h2>
          <button className="btn btn-primary mt-lg" onClick={() => navigate('/')}>Volver al inicio</button>
        </main>
      </div>
    );
  }

  const renderStatus = () => {
    switch (paymentStatus) {
      case 'PAID':
        return (
          <div className="card p-xl text-center flex flex-col items-center">
            <CheckCircle size={64} style={{ color: 'var(--color-success)' }} className="mb-md" />
            <h1 className="mb-sm" style={{ color: 'var(--color-success)' }}>Compra confirmada</h1>
            <p className="text-muted mb-lg">¡Gracias por participar, {purchase.participant.name}!</p>
            
            <div className="mb-lg p-md" style={{ backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)', width: '100%' }}>
              <p className="font-semibold mb-sm">Números adquiridos:</p>
              <div className="flex gap-sm justify-center flex-wrap">
                {purchase.tickets.map(t => (
                  <span key={t.id} className="font-mono font-semibold" style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                    #{String(t.number).padStart(3, '0')}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted mb-lg">
              Identificador de compra: <span className="font-mono">{purchase.id}</span>
            </div>
            
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Volver a la rifa
            </button>
          </div>
        );
      
      case 'REJECTED':
        return (
          <div className="card p-xl text-center flex flex-col items-center">
            <XCircle size={64} style={{ color: 'var(--color-error)' }} className="mb-md" />
            <h1 className="mb-sm" style={{ color: 'var(--color-error)' }}>El pago no pudo completarse</h1>
            <p className="text-muted mb-lg">Hubo un problema al procesar tu pago. Tus números siguen reservados temporalmente.</p>
            
            <div className="flex gap-md">
              <button className="btn btn-outline" onClick={() => navigate('/')}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => navigate(`/checkout`)}>Volver a intentar</button>
            </div>
          </div>
        );

      case 'PENDING':
      default:
        return (
          <div className="card p-xl text-center flex flex-col items-center">
            <Clock size={64} style={{ color: 'var(--color-warning)' }} className="mb-md" />
            <h1 className="mb-sm" style={{ color: 'var(--color-warning)' }}>Pago pendiente</h1>
            <p className="text-muted mb-lg">Estamos esperando la confirmación del pago de Mercado Pago.</p>
            <p className="text-sm text-muted mb-lg">Te enviaremos un correo electrónico cuando la compra se confirme.</p>
            
            <button className="btn btn-outline" onClick={() => navigate('/')}>Volver al inicio</button>
          </div>
        );
    }
  };

  return (
    <div>
      <RaffleHeader />
      <main className="container mt-xl mb-xl flex justify-center">
        <div style={{ maxWidth: '600px', width: '100%' }}>
          {renderStatus()}
        </div>
      </main>
    </div>
  );
};
