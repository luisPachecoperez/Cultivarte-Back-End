import { GetActividadSedesUseCaseImpl } from '../../Actividad/get-actividad-sedes';
import { Actividad, ActividadRepository, RespuestaGrap } from '../../../';

describe('GetActividadSedesUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    getActividadSedes: jest.fn(),
  } as any;

  const useCase = new GetActividadSedesUseCaseImpl(actividadRepository);

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

  it('retorna actividades correctamente', async () => {
    actividadRepository.getActividadSedes.mockResolvedValueOnce([
      mockActividad,
    ]);
    const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
    expect(actividadRepository.getActividadSedes).toHaveBeenCalledWith(
      'user1',
      '2024-01-01',
      '2024-01-31',
    );
    expect(result).toEqual([mockActividad]);
  });

  it('retorna respuesta de error', async () => {
    actividadRepository.getActividadSedes.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.getActividadSedes.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(
      useCase.execute('user1', '2024-01-01', '2024-01-31'),
    ).rejects.toThrow('DB error');
  });
});
