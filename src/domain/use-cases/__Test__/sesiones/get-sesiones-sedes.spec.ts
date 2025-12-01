import { GetSesionesSedesUseCaseImpl } from '../../sesiones/get-sesiones-sedes';
import { RespuestaGrap, Sesion, SesionRepository } from '../../../';

describe('GetSesionesSedesUseCaseImpl', () => {
  const sesionesRepository: SesionRepository = {
    getSesionesSede: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetSesionesSedesUseCaseImpl(sesionesRepository);

  const mockSesiones: Sesion[] = [
    { id: '1', nombre: 'Sesion 1' } as any,
    { id: '2', nombre: 'Sesion 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getSesionesSede con los argumentos correctos', async () => {
    (sesionesRepository.getSesionesSede as jest.Mock).mockResolvedValueOnce(mockSesiones);
    const result = await useCase.execute('user1', '2025-01-01', '2025-01-31');
    expect(sesionesRepository.getSesionesSede).toHaveBeenCalledWith('user1', '2025-01-01', '2025-01-31');
    expect(result).toBe(mockSesiones);
  });

  it('retorna respuesta de error', async () => {
    (sesionesRepository.getSesionesSede as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('user2', '2025-02-01', '2025-02-28');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionesRepository.getSesionesSede as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('user3', '2025-03-01', '2025-03-31')).rejects.toThrow('DB error');
  });
});