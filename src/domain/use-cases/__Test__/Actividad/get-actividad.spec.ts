import { GetActividadUseCaseImpl } from '../../Actividad/get-actividad';
import { Actividad, ActividadRepository, RespuestaGrap } from '../../../';

describe('GetActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    getById: jest.fn(),
  } as any;

  const useCase = new GetActividadUseCaseImpl(actividadRepository);

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

  it('retorna actividad correctamente', async () => {
    actividadRepository.getById.mockResolvedValueOnce(mockActividad);
    const result = await useCase.execute('1');
    expect(actividadRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockActividad);
  });

  it('retorna respuesta de error', async () => {
    actividadRepository.getById.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.getById.mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
});
