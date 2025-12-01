import { UpdateActividadUseCaseImpl } from '../../Actividad/update-evento';
import { Actividad, ActividadRepository, RespuestaGrap } from '../../../';

describe('UpdateActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    updateById: jest.fn(),
  } as any;

  const useCase = new UpdateActividadUseCaseImpl(actividadRepository);

  const mockActividad: Actividad = {
    id_programa: 'programa1',
    id_tipo_actividad: 'tipo1',
    id_responsable: 'responsable1',
    id_aliado: 'aliado1',
    fecha_actividad: new Date(),
    descripcion: 'descripcion1',
    estado: 'A',
    id_sede: 'sede1',
    id_frecuencia: 'frecuencia1',
    institucional: 'N',
    nombre_actividad: 'Actividad de prueba',
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('actualiza actividad correctamente', async () => {
    actividadRepository.updateById.mockResolvedValueOnce(mockActividad);
    const result = await useCase.execute('1', mockActividad);
    expect(actividadRepository.updateById).toHaveBeenCalledWith(
      '1',
      mockActividad,
    );
    expect(result).toBe(mockActividad);
  });

  it('retorna respuesta de error', async () => {
    actividadRepository.updateById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1', mockActividad);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('1', mockActividad)).rejects.toThrow(
      'DB error',
    );
  });
});
