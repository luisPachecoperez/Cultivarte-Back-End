import { GetAsistenciasUseCaseImpl } from '../../asistencias/get-asistencias';
import { Asistencia, AsistenciaRepository, RespuestaGrap } from '../../../';

describe('GetAsistenciasUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    getAll: jest.fn(),
  } as any;

  const useCase = new GetAsistenciasUseCaseImpl(asistenciaRepository);

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

  it('retorna asistencias correctamente', async () => {
    asistenciaRepository.getAll.mockResolvedValueOnce([mockAsistencia]);
    const result = await useCase.execute();
    expect(asistenciaRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([mockAsistencia]);
  });

  it('retorna respuesta de error', async () => {
    asistenciaRepository.getAll.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
