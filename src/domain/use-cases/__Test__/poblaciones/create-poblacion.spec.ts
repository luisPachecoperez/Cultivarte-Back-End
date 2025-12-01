import { CreatePoblacionUseCaseImpl } from '../../poblaciones/create-poblacion';
import { Poblacion, PoblacionRepository, RespuestaGrap } from '../../../';

describe('CreatePoblacionUseCaseImpl', () => {
  const poblacionRepository: PoblacionRepository = {
    createPoblacion: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreatePoblacionUseCaseImpl(poblacionRepository);

  const mockPoblacion: Poblacion = { id: '1', nombre: 'Poblacion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna Poblacion correctamente', async () => {
    (poblacionRepository.createPoblacion as jest.Mock).mockResolvedValueOnce(mockPoblacion);
    const result = await useCase.execute(mockPoblacion);
    expect(poblacionRepository.createPoblacion).toHaveBeenCalledWith(mockPoblacion);
    expect(result).toBe(mockPoblacion);
  });

  it('retorna respuesta de error', async () => {
    (poblacionRepository.createPoblacion as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockPoblacion);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (poblacionRepository.createPoblacion as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute(mockPoblacion)).rejects.toThrow('DB error');
  });
});