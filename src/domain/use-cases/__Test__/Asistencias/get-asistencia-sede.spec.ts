import { GetAsistenciasSedeUseCaseImpl } from '../../asistencias/get-asistencia-sede';
import { Asistencia, RespuestaGrap, AsistenciaRepository } from '../../../';

describe('GetAsistenciasSedeUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    getAsistenciasSede: jest.fn(),
  } as any;

  const useCase = new GetAsistenciasSedeUseCaseImpl(asistenciaRepository);

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
    asistenciaRepository.getAsistenciasSede.mockResolvedValueOnce([
      mockAsistencia,
    ]);
    const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
    expect(asistenciaRepository.getAsistenciasSede).toHaveBeenCalledWith(
      'user1',
      '2024-01-01',
      '2024-01-31',
    );
    expect(result).toEqual([mockAsistencia]);
  });

  it('retorna respuesta de error', async () => {
    asistenciaRepository.getAsistenciasSede.mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.getAsistenciasSede.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(
      useCase.execute('user1', '2024-01-01', '2024-01-31'),
    ).rejects.toThrow('DB error');
  });
});
