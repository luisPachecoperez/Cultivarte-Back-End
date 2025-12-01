import { GetParametriaEventosUseCaseImpl } from '../../queries/get-parametria-eventos';
import { ParametriaEventos, ParametriaEventosRepository } from '../../../';

describe('GetParametriaEventosUseCaseImpl', () => {
  const repository: ParametriaEventosRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetParametriaEventosUseCaseImpl(repository);

  const mockEventos: ParametriaEventos = { id: '1', nombre: 'Evento Test' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ParametriaEventos correctamente', async () => {
    (repository.getAll as jest.Mock).mockResolvedValueOnce(mockEventos);
    const result = await useCase.execute();
    expect(repository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockEventos);
  });

  it('retorna null si no hay eventos', async () => {
    (repository.getAll as jest.Mock).mockResolvedValueOnce(null);
    const result = await useCase.execute();
    expect(result).toBeNull();
  });

  it('propaga errores si ocurren', async () => {
    (repository.getAll as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});