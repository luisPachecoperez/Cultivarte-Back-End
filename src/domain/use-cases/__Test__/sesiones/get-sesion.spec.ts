import { GetSesionUseCaseImpl } from '../../sesiones/get-sesion';
import { Sesion, SesionRepository, RespuestaGrap } from '../../../';

describe('GetSesionUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetSesionUseCaseImpl(sesionRepository);

  const mockSesion: Sesion = { id: '1', nombre: 'Sesion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getById con el id correcto', async () => {
    (sesionRepository.getById as jest.Mock).mockResolvedValueOnce(mockSesion);
    const result = await useCase.execute('1');
    expect(sesionRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockSesion);
  });

  it('retorna Sesion correctamente', async () => {
    (sesionRepository.getById as jest.Mock).mockResolvedValueOnce(mockSesion);
    const result = await useCase.execute('2');
    expect(result).toBe(mockSesion);
  });

  it('retorna respuesta de error', async () => {
    (sesionRepository.getById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('3');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.getById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('4')).rejects.toThrow('DB error');
  });
});