import { DeleteAsistenciaUseCaseImpl } from '../../asistencias/delete-asistencia';
import { AsistenciaRepository, RespuestaGrap } from '../../../';

describe('DeleteAsistenciaUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    deleteById: jest.fn(),
  } as any;

  const useCase = new DeleteAsistenciaUseCaseImpl(asistenciaRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminada' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta deleteById y retorna la respuesta', async () => {
    asistenciaRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1');
    expect(asistenciaRepository.deleteById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.deleteById.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
});
