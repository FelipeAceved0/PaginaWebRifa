import type { Raffle } from '../types';
import { Calendar } from 'lucide-react';

interface RaffleHeroProps {
  raffle: Raffle;
}

export const RaffleHero = ({ raffle }: RaffleHeroProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  const scrollToTickets = () => {
    const el = document.getElementById('ticket-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid-2-col mt-xl mb-xxl" style={{ alignItems: 'center' }}>
      {/* Left Column: Text & CTA */}
      <div className="flex-col gap-md" style={{ paddingRight: 'var(--spacing-md)' }}>
        <div className="text-sm font-bold text-muted uppercase tracking-wide">Gran Sorteo</div>
        <h1 className="text-hero" style={{ color: 'var(--color-primary)' }}>{raffle.title}</h1>
        <p className="text-muted" style={{ maxWidth: '450px', fontSize: '1.25rem' }}>{raffle.description}</p>
        
        <div className="mt-md mb-md">
          <div className="text-sm font-bold text-muted mb-xs uppercase tracking-wide">Valor de participación</div>
          <div className="price-display">{formatCurrency(raffle.ticketPrice)}</div>
        </div>

        <div className="flex gap-lg items-center flex-wrap">
          <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }} onClick={scrollToTickets}>
            Elegir números
          </button>
          <div className="flex items-center gap-xs text-sm font-bold text-muted">
            <Calendar size={18} />
            <span style={{ paddingTop: '2px' }}>Sortea: {formatDate(raffle.drawDate)}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Prominent Editorial Image */}
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '350px', display: 'flex', justifyContent: 'flex-end' }}>
        <img 
          src={raffle.mainImageUrl} 
          alt={raffle.title} 
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '600px',
            objectFit: 'cover',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: '0 24px 40px -12px rgba(0,0,0,0.1)' // Very soft, large shadow for editorial feel
          }}
        />
      </div>
    </div>
  );
};
