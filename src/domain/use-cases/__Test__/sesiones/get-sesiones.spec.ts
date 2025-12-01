import { GetSesionesUseCaseImpl } from '../../sesiones/get-sesiones';
import { Sesion, SesionRepository, RespuestaGrap } from '../../../';

describe('GetSesionesUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetSesionesUseCaseImpl(sesionRepository);

  const mockSesiones: Sesion[] = [
    { id: '1', nombre: 'Sesion 1' } as any,
    { id: '2', nombre: 'Sesion 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getAll con los argumentos correctos', async () => {
    (sesionRepository.getAll as jest.Mock).mockResolvedValueOnce(mockSesiones);
    const result = await useCase.execute(10, 0);
    expect(sesionRepository.getAll).toHaveBeenCalledWith(10, 0);
    expect(result).toBe(mockSesiones);
  });

  it('retorna respuesta de error', async () => {
    (sesionRepository.getAll as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(5, 2);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.getAll as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute(1, 1)).rejects.toThrow('DB error');
  });
});