import { GetAsistenciaUseCaseImpl } from '../../asistencias/get-asistencia';
import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../../';

describe('GetAsistenciaUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    getById: jest.fn(),
  } as any;

  const useCase = new GetAsistenciaUseCaseImpl(asistenciaRepository);

  const mockAsistencia: Asistencia = {
    id_asistencia: '1',
    id_sesion: '1',
    id_persona: null,
    id_creado_por: null,
    fecha_creacion: null,
    id_modificado_por: null,
    fecha_modificacion: null,
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna asistencia correctamente', async () => {
    asistenciaRepository.getById.mockResolvedValueOnce(mockAsistencia);
    const result = await useCase.execute('1');
    expect(asistenciaRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockAsistencia);
  });

  it('retorna respuesta de error', async () => {
    asistenciaRepository.getById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.getById.mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
});
