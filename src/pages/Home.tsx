import { useEffect, useState } from 'react';
import { RaffleHeader } from '../components/RaffleHeader';
import { RaffleHero } from '../components/RaffleHero';
import { TicketGrid } from '../components/TicketGrid';
import { TicketLegend } from '../components/TicketLegend';
import { PurchaseSummary } from '../components/PurchaseSummary';
import { getRaffle, getTickets } from '../services/api';
import type { Raffle, Ticket } from '../types';

export const Home = () => {
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raffleData, ticketsData] = await Promise.all([
          getRaffle(),
          getTickets()
        ]);
        setRaffle(raffleData);
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicketIds(prev => {
      if (prev.includes(ticket.id)) {
        return prev.filter(id => id !== ticket.id);
      } else {
        return [...prev, ticket.id];
      }
    });
  };

  const handleContinue = () => {
    sessionStorage.setItem('selectedTickets', JSON.stringify(selectedTicketIds));
    window.location.href = '/checkout';
  };

  if (loading || !raffle) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: '100vh' }}>
        <p className="text-lg text-muted">Cargando rifa...</p>
      </div>
    );
  }

  const selectedTickets = tickets.filter(t => selectedTicketIds.includes(t.id));

  // Asymmetric Prizes layout
  const mainPrize = raffle.prizes.find(p => p.position === 1);
  const secondaryPrizes = raffle.prizes.filter(p => p.position !== 1).sort((a, b) => a.position - b.position);

  return (
    <div>
      <RaffleHeader />
      <main className="container">
        <RaffleHero raffle={raffle} />
        
        {/* Asymmetrical Prizes Section */}
        <section className="mb-xxl pt-xl" style={{ borderTop: '1px solid #e2e8f0' }}>
          <div className="text-center mb-xl">
            <h2 className="mb-xs">Premios Increíbles</h2>
            <p>Participa y llévate el setup de tus sueños.</p>
          </div>
          
          {mainPrize && (
            <div className="grid-2-col mb-xl" style={{ alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', minHeight: '350px' }}>
                <img 
                  src={mainPrize.imageUrl} 
                  alt={mainPrize.title} 
                  style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 24px 40px -12px rgba(0,0,0,0.1)' }}
                />
              </div>
              <div style={{ paddingLeft: 'var(--spacing-md)' }}>
                <div className="text-sm font-bold text-muted mb-xs uppercase tracking-wide" style={{ color: 'var(--color-warning)' }}>Primer Premio</div>
                <h3 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 'var(--spacing-sm)' }}>
                  {mainPrize.title}
                </h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>{mainPrize.description}</p>
              </div>
            </div>
          )}
          
          {secondaryPrizes.length > 0 && (
            <div className="flex flex-col gap-xxl mt-xl pt-xl" style={{ borderTop: '1px solid #e2e8f0' }}>
              {secondaryPrizes.map((prize, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={prize.id} className="grid-2-col" style={{ alignItems: 'center' }}>
                    
                    {/* Content Block */}
                    <div className={isEven ? 'md-order-2' : 'md-order-1'} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <div className="text-sm font-bold text-muted uppercase tracking-wide">Premio #{prize.position}</div>
                      <h4 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{prize.title}</h4>
                      <p>{prize.description}</p>
                    </div>

                    {/* Image Block */}
                    {prize.imageUrl && (
                      <div className={isEven ? 'md-order-1' : 'md-order-2'} style={{ position: 'relative', width: '100%', minHeight: '250px' }}>
                        <img 
                          src={prize.imageUrl} 
                          alt={prize.title} 
                          style={{ width: '100%', height: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--border-radius-lg)', boxShadow: '0 24px 40px -12px rgba(0,0,0,0.1)' }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
        
        {/* Ticket Selector & Sidebar */}
        <section id="ticket-section" className="mb-xxl pt-xl" style={{ borderTop: '1px solid #e2e8f0' }}>
          <div className="grid-sidebar">
            
            {/* Left: Tickets Grid */}
            <div>
              <h2 className="mb-sm">Elige tus números</h2>
              <p className="text-muted mb-lg">
                Selecciona los números con los que deseas participar. Quedan {raffle.availableTickets} disponibles.
              </p>
              <TicketLegend />
              <TicketGrid 
                tickets={tickets} 
                selectedTicketIds={selectedTicketIds} 
                onSelectTicket={handleSelectTicket} 
              />
            </div>

            {/* Right: Sticky Sidebar Summary */}
            <div className="sticky-sidebar hidden md:block">
              <PurchaseSummary 
                selectedTickets={selectedTickets} 
                onContinue={handleContinue} 
              />
            </div>

          </div>
        </section>
      </main>

      {/* Mobile Sticky Footer */}
      <div className="md:block hidden" style={{ display: 'none' /* Will be overridden by media query to show on mobile if needed, wait, better to use conditional rendering or pure CSS class */ }}></div>
      <div className="mobile-only-summary" style={{ display: 'none' }}></div>
      {/* Real Mobile Sticky */}
      <div className="mobile-sticky-bottom">
        <PurchaseSummary 
          selectedTickets={selectedTickets} 
          onContinue={handleContinue} 
          isMobile={true}
        />
      </div>
    </div>
  );
};
