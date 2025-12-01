import { GetPoblacionesUseCaseImpl } from '../../poblaciones/get-poblaciones';
import { Poblacion, PoblacionRepository, RespuestaGrap } from '../../../';

describe('GetPoblacionesUseCaseImpl', () => {
  const poblacionRepository: PoblacionRepository = {
    getPoblaciones: jest.fn(),
    // otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPoblacionesUseCaseImpl(poblacionRepository);

  const mockPoblaciones: Poblacion[] = [
    { id: '1', nombre: 'Poblacion 1' } as any,
    { id: '2', nombre: 'Poblacion 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de Poblacion correctamente', async () => {
    (poblacionRepository.getPoblaciones as jest.Mock).mockResolvedValueOnce(mockPoblaciones);
    const result = await useCase.execute();
    expect(poblacionRepository.getPoblaciones).toHaveBeenCalled();
    expect(result).toBe(mockPoblaciones);
  });

  it('retorna respuesta de error', async () => {
    (poblacionRepository.getPoblaciones as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (poblacionRepository.getPoblaciones as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});