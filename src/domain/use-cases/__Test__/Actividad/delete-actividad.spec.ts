import { DeleteActividadUseCaseImpl } from '../../Actividad/delete-actividad';
import { ActividadRepository, RespuestaGrap } from '../../../';

describe('DeleteActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    deleteById: jest.fn(),
  } as any;

  const useCase = new DeleteActividadUseCaseImpl(actividadRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminada' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta deleteById y retorna la respuesta', async () => {
    actividadRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1');
    expect(actividadRepository.deleteById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
});
