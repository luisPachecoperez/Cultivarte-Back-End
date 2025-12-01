import { UpdateSesionUseCaseImpl } from '../../sesiones/update-sesion';
import { RespuestaGrap, Sesion, SesionRepository } from '../../../';

describe('UpdateSesionUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    updateById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdateSesionUseCaseImpl(sesionRepository);

  const mockSesion: Sesion = { id: '1', nombre: 'Sesion Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateById con los argumentos correctos', async () => {
    (sesionRepository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1', mockSesion);
    expect(sesionRepository.updateById).toHaveBeenCalledWith('1', mockSesion);
  });

  it('retorna la respuesta del repositorio', async () => {
    (sesionRepository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2', mockSesion);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.updateById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3', mockSesion)).rejects.toThrow('DB error');
  });
});