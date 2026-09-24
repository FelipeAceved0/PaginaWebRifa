import React, { useState } from 'react';
import { Participant } from '../types';

interface ParticipantFormProps {
  onSubmit: (participant: Participant) => void;
  isSubmitting: boolean;
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<Participant>({
    name: '',
    rut: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="surface" style={{ padding: 'var(--spacing-xl)', border: '1px solid #e2e8f0' }}>
      <h3 className="mb-xs">Tus Datos</h3>
      <p className="text-sm text-muted mb-lg">
        Necesitamos tus datos para contactarte en caso de que resultes ganador. 
        Tu información está protegida.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nombre completo</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-input" 
            required 
            placeholder="Ej. Juan Pérez"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="rut">RUT</label>
          <input 
            type="text" 
            id="rut" 
            name="rut" 
            className="form-input" 
            required 
            placeholder="Ej. 12.345.678-9"
            value={formData.rut}
            onChange={handleChange}
          />
          <small className="text-muted text-xs">Para validar tu identidad al entregar el premio.</small>
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            required 
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group mb-lg">
          <label className="form-label" htmlFor="phone">Teléfono (WhatsApp)</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="form-input" 
            required 
            placeholder="+56 9 1234 5678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Procesando...' : 'Continuar al pago'}
        </button>
      </form>
    </div>
  );
};
