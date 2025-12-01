import { CreateAsistenciaUseCaseImpl } from '../../asistencias/create-asistencia';
import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../../';

describe('CreateAsistenciaUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    createAsistencia: jest.fn(),
  } as any;

  const useCase = new CreateAsistenciaUseCaseImpl(asistenciaRepository);

  const asistencia: Asistencia = {
    id_asistencia: '1',
    id_sesion: '1',
    id_persona: null,
    id_creado_por: null,
    fecha_creacion: null,
    id_modificado_por: null,
    fecha_modificacion: null,
  };

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creada' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta createAsistencia y retorna la respuesta', async () => {
    asistenciaRepository.createAsistencia.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(asistencia);
    expect(asistenciaRepository.createAsistencia).toHaveBeenCalledWith(
      asistencia,
    );
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.createAsistencia.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(asistencia)).rejects.toThrow('DB error');
  });
});
