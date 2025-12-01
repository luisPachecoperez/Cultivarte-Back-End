import { UpdateAsistenciaUseCaseImpl } from '../../asistencias/update-asistencia';
import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../../';

describe('UpdateAsistenciaUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    updateById: jest.fn(),
  } as any;

  const useCase = new UpdateAsistenciaUseCaseImpl(asistenciaRepository);

  const mockAsistencia: Asistencia = {
    id_asistencia: '1',
    id_sesion: '1',
    id_persona: null,
    id_creado_por: null,
    fecha_creacion: null,
    id_modificado_por: null,
    fecha_modificacion: null,
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizada' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta updateById y retorna la respuesta', async () => {
    asistenciaRepository.updateById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1', mockAsistencia);
    expect(asistenciaRepository.updateById).toHaveBeenCalledWith(
      '1',
      mockAsistencia,
    );
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.updateById.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('1', mockAsistencia)).rejects.toThrow(
      'DB error',
    );
  });
});
