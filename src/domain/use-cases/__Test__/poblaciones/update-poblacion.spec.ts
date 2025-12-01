import { UpdatePoblacionUseCaseImpl } from '../../poblaciones/update-poblacion';
import { Poblacion, PoblacionRepository, RespuestaGrap } from '../../../';

describe('UpdatePoblacionUseCaseImpl', () => {
  const poblacionRepository: PoblacionRepository = {
    updatePoblacionById: jest.fn(),
    // otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdatePoblacionUseCaseImpl(poblacionRepository);

  const mockPoblacion: Poblacion = { id: '1', nombre: 'Poblacion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updatePoblacionById con los argumentos correctos', async () => {
    (poblacionRepository.updatePoblacionById as jest.Mock).mockResolvedValueOnce(mockPoblacion);
    await useCase.execute('1', mockPoblacion);
    expect(poblacionRepository.updatePoblacionById).toHaveBeenCalledWith('1', mockPoblacion);
  });

  it('retorna Poblacion correctamente', async () => {
    (poblacionRepository.updatePoblacionById as jest.Mock).mockResolvedValueOnce(mockPoblacion);
    const result = await useCase.execute('2', mockPoblacion);
    expect(result).toBe(mockPoblacion);
  });

  it('retorna respuesta de error', async () => {
    (poblacionRepository.updatePoblacionById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('3', mockPoblacion);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (poblacionRepository.updatePoblacionById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('4', mockPoblacion)).rejects.toThrow('DB error');
  });
});