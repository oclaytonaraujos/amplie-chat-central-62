import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SetorCard } from '../SetorCard';
import { type SetorData } from '@/services/setoresService';

const mockSetor: SetorData = {
  id: '1',
  nome: 'Vendas',
  descricao: 'Setor de vendas da empresa',
  cor: '#3B82F6',
  ativo: true,
  empresa_id: 'test-empresa',
  capacidade_maxima: 10,
  agentes_ativos: 5,
  atendimentos_ativos: 3,
  created_at: '2023-01-01T00:00:00.000Z'
};

describe('SetorCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders setor information correctly', () => {
    render(
      <SetorCard 
        setor={mockSetor} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Vendas')).toBeInTheDocument();
    expect(screen.getByText('Setor de vendas da empresa')).toBeInTheDocument();
    expect(screen.getByText('5/10 agentes')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SetorCard 
        setor={mockSetor} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockSetor);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SetorCard 
        setor={mockSetor} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /trash/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockSetor);
  });

  it('shows inactive badge for inactive setores', () => {
    const inactiveSetor = { ...mockSetor, ativo: false };
    
    render(
      <SetorCard 
        setor={inactiveSetor} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});