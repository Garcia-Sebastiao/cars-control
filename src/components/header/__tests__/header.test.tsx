import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../header';
import { useVehiclesStore } from '@/store/vehicles.store';

// Mock do store
jest.mock('@/store/vehicles.store', () => ({
  useVehiclesStore: jest.fn(),
}));

describe('Header', () => {
  const mockSetFilter = jest.fn();
  const mockSetType = jest.fn();

  beforeEach(() => {
    // Configuração do mock do store antes de cada teste
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      setFilter: mockSetFilter,
      setType: mockSetType,
      type: 'tracked',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render header with all elements', () => {
    render(<Header />);
    
    // Verifica se o título está presente
    expect(screen.getByText('Lista')).toBeInTheDocument();
    
    // Verifica se os radio buttons estão presentes
    expect(screen.getByLabelText('Rastreados')).toBeInTheDocument();
    expect(screen.getByLabelText('Outros')).toBeInTheDocument();
    
    // Verifica se o input de busca está presente
    expect(screen.getByPlaceholderText('Buscar por placa ou frota')).toBeInTheDocument();
    
    // Verifica se o botão "Novo" está presente
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('should call setType when radio button is clicked', () => {
    render(<Header />);
    
    // Clica no radio button "Outros"
    fireEvent.click(screen.getByLabelText('Outros'));
    
    // Verifica se setType foi chamado com o valor correto
    expect(mockSetType).toHaveBeenCalledWith('others');
  });

  it('should call setFilter when input value changes', () => {
    render(<Header />);
    
    const searchInput = screen.getByPlaceholderText('Buscar por placa ou frota');
    fireEvent.change(searchInput, { target: { value: 'ABC123' } });
    
    // Verifica se setFilter foi chamado com o valor correto
    expect(mockSetFilter).toHaveBeenCalledWith('ABC123');
  });

  it('should show correct radio button checked based on type', () => {
    // Configura o mock para retornar type como 'others'
    (useVehiclesStore as unknown as jest.Mock).mockReturnValue({
      setFilter: mockSetFilter,
      setType: mockSetType,
      type: 'others',
    });

    render(<Header />);
    
    // Verifica se o radio button "Outros" está marcado
    expect(screen.getByLabelText('Outros')).toBeChecked();
    expect(screen.getByLabelText('Rastreados')).not.toBeChecked();
  });
}); 