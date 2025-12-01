import { UpdateAsistenciasUseCaseImpl } from '../../asistencias/update-asistencias';
import {
  AsistenciaSesiones,
  RespuestaGrap,
  AsistenciaRepository,
} from '../../../';

describe('UpdateAsistenciasUseCaseImpl', () => {
  const asistenciaRepository: jest.Mocked<AsistenciaRepository> = {
    updateAsistencias: jest.fn(),
  } as any;

  const useCase = new UpdateAsistenciasUseCaseImpl(asistenciaRepository);

  const mockSesiones: AsistenciaSesiones = {
    id_actividad: '1',
    id_sesion: '1',
    imagen: '',
    numero_asistentes: 0,
    descripcion: '',
    nuevos: [],
  };

  const mockRespuesta: RespuestaGrap = {
    exitoso: 'S',
    mensaje: 'Actualizadas',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta updateAsistencias y retorna la respuesta', async () => {
    asistenciaRepository.updateAsistencias.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockSesiones);
    expect(asistenciaRepository.updateAsistencias).toHaveBeenCalledWith(
      mockSesiones,
    );
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    asistenciaRepository.updateAsistencias.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockSesiones)).rejects.toThrow('DB error');
  });
});
