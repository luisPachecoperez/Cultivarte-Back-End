import { GetPreAsistenciaUseCaseImpl } from '../../asistencias/get-pre-asistencia';
import { PreAsistencia, AsistenciaRepository, RespuestaGrap } from '../../../';

describe('GetPreAsistenciaUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    getPreAsistencia: jest.fn(),
  } as any;

  const useCase = new GetPreAsistenciaUseCaseImpl(asistenciaRepository);

  const mockPreAsistencia: PreAsistencia = {
    id_sesion: '1',
    id_sede: '10',
    numero_asistentes: 5,
    foto: 'foto.jpg',
    imagen: 'imagen.jpg',
    descripcion: 'Descripción de prueba',
    sedes: [{ id_sede: '10', nombre: 'Sede Test' }],
    beneficiarios: [
      {
        id_persona: '100',
        nombre_completo: 'Beneficiario Test',
        id_sede: '10',
      },
    ],
    asistentes_sesiones: [{ id_persona: '100', eliminar: 'N' }],
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna preAsistencia correctamente', async () => {
    asistenciaRepository.getPreAsistencia.mockResolvedValueOnce(
      mockPreAsistencia,
    );
    const result = await useCase.execute('1');
    expect(asistenciaRepository.getPreAsistencia).toHaveBeenCalledWith('1');
    expect(result).toBe(mockPreAsistencia);
  });

  it('retorna respuesta de error', async () => {
    asistenciaRepository.getPreAsistencia.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.getPreAsistencia.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
});
