import { GetPoblacionUseCaseImpl } from '../../poblaciones/get-poblacion';
import { Poblacion, PoblacionRepository, RespuestaGrap } from '../../../';

describe('GetPoblacionUseCaseImpl', () => {
  const poblacionRepository: PoblacionRepository = {
    getPoblacionById: jest.fn(),
    // otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPoblacionUseCaseImpl(poblacionRepository);

  const mockPoblacion: Poblacion = { id: '1', nombre: 'Poblacion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna Poblacion correctamente', async () => {
    (poblacionRepository.getPoblacionById as jest.Mock).mockResolvedValueOnce(mockPoblacion);
    const result = await useCase.execute('1');
    expect(poblacionRepository.getPoblacionById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockPoblacion);
  });

  it('retorna respuesta de error', async () => {
    (poblacionRepository.getPoblacionById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (poblacionRepository.getPoblacionById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});