import { DeletePoblacionUseCaseImpl } from '../../poblaciones/delete-poblacion';
import { PoblacionRepository, RespuestaGrap } from '../../../';

describe('DeletePoblacionUseCaseImpl', () => {
  const poblacionRepository: PoblacionRepository = {
    deletePoblacionById: jest.fn(),
    // otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new DeletePoblacionUseCaseImpl(poblacionRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado correctamente' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe llamar deletePoblacionById con el id correcto', async () => {
    (poblacionRepository.deletePoblacionById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1');
    expect(poblacionRepository.deletePoblacionById).toHaveBeenCalledWith('1');
  });

  it('debe retornar la respuesta del repositorio', async () => {
    (poblacionRepository.deletePoblacionById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('debe propagar errores si ocurren', async () => {
    (poblacionRepository.deletePoblacionById as jest.Mock).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});