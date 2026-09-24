import React, { useEffect, useState } from 'react';
import { RaffleHeader } from '../components/RaffleHeader';
import { SalesTable } from '../components/SalesTable';
import { getDashboardStats } from '../services/api';
import { Users, Ticket, DollarSign, Activity, Menu, X, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Admin: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: '100vh' }}>
        <p className="text-lg text-muted">Cargando panel...</p>
      </div>
    );
  }

  const NavLinks = () => (
    <>
      <div className="admin-nav-section">Principal</div>
      <Link to="/admin" className="admin-nav-item active" onClick={closeMenu}>
        <Activity size={20} /> Dashboard
      </Link>
      <div className="admin-nav-item" style={{ cursor: 'not-allowed', opacity: 0.7 }} title="Próximamente">
        <Ticket size={20} /> Rifas
      </div>
      <div className="admin-nav-item" style={{ cursor: 'not-allowed', opacity: 0.7 }} title="Próximamente">
        <Users size={20} /> Participantes
      </div>
      
      <div className="admin-nav-section">Sistema</div>
      <div className="admin-nav-item" style={{ cursor: 'not-allowed', opacity: 0.7 }} title="Próximamente">
        <Settings size={20} /> Configuración
      </div>
      <div className="admin-nav-item" style={{ cursor: 'not-allowed', opacity: 0.7, color: 'var(--color-error)' }} title="Próximamente">
        <LogOut size={20} /> Cerrar sesión
      </div>
    </>
  );

  return (
    <div>
      <RaffleHeader />
      <div className="admin-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 65px)' }}>
        
        {/* Mobile Top Bar */}
        <div className="admin-topbar-mobile">
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.5rem', border: 'none' }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold ml-sm">Panel Administrativo</span>
        </div>

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={closeMenu} aria-hidden="true" />
        )}

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="flex justify-between items-center p-md" style={{ borderBottom: '1px solid #e2e8f0' }}>
            <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>Menú</span>
            <button className="btn btn-outline" style={{ padding: '0.5rem', border: 'none' }} onClick={closeMenu} aria-label="Cerrar menú">
              <X size={24} />
            </button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 'var(--spacing-xl)' }}>
            <NavLinks />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="admin-nav">
          <div style={{ overflowY: 'auto', height: '100%', paddingBottom: 'var(--spacing-xl)' }}>
            <NavLinks />
          </div>
        </aside>

        {/* Main Content */}
        <main className="container mt-lg mb-xl" style={{ flex: 1, minWidth: 0 }}>
          <h1 className="mb-lg">Panel Administrativo</h1>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
            <div className="surface" style={{ padding: 'var(--spacing-lg)', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-sm text-muted mb-sm">
                <DollarSign size={20} style={{ flexShrink: 0 }} />
                <h3 className="text-sm m-0" style={{ lineHeight: 1.2 }}>Recaudación Total</h3>
              </div>
              <div className="font-bold text-2xl" style={{ color: 'var(--color-primary)', wordBreak: 'break-word' }}>
                {formatCurrency(stats.totalRevenue)}
              </div>
            </div>
            
            <div className="surface" style={{ padding: 'var(--spacing-lg)', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-sm text-muted mb-sm">
                <Ticket size={20} style={{ flexShrink: 0 }} />
                <h3 className="text-sm m-0" style={{ lineHeight: 1.2 }}>Números Vendidos</h3>
              </div>
              <div className="font-bold text-2xl text-success" style={{ wordBreak: 'break-word' }}>
                {stats.soldTickets} <span className="text-sm text-muted font-normal">/ {stats.totalTickets}</span>
              </div>
            </div>

            <div className="surface" style={{ padding: 'var(--spacing-lg)', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-sm text-muted mb-sm">
                <Activity size={20} style={{ flexShrink: 0 }} />
                <h3 className="text-sm m-0" style={{ lineHeight: 1.2 }}>Disponibles / Reservados</h3>
              </div>
              <div className="font-bold text-2xl text-warning" style={{ wordBreak: 'break-word' }}>
                {stats.availableTickets} <span className="text-sm text-muted font-normal">/ {stats.reservedTickets}</span>
              </div>
            </div>
          </div>

          <div className="surface" style={{ border: '1px solid #e2e8f0' }}>
            <div className="p-md" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <h2 className="text-lg m-0">Últimas Ventas</h2>
            </div>
            <div className="p-md" style={{ overflowX: 'auto' }}>
              <SalesTable purchases={stats.recentPurchases} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
