import { DeleteSesionUseCaseImpl } from '../../sesiones/delete-sesion';
import { RespuestaGrap, SesionRepository } from '../../../';

describe('DeleteSesionUseCaseImpl', () => {
  const sesionRepository: SesionRepository = {
    deleteById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new DeleteSesionUseCaseImpl(sesionRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama deleteById con el id correcto', async () => {
    (sesionRepository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1');
    expect(sesionRepository.deleteById).toHaveBeenCalledWith('1');
  });

  it('retorna la respuesta del repositorio', async () => {
    (sesionRepository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (sesionRepository.deleteById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});