import { CreateActividadUseCaseImpl } from '../../../use-cases/Actividad/create-actividad';
import {
  Actividad,
  ActividadRepository,
  RespuestaGrap,
} from '../../../../domain';

describe('CreateActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    createActividad: jest.fn(),
  } as any;

  const useCase = new CreateActividadUseCaseImpl(actividadRepository);

  const actividad: Actividad = {
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
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creada' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ejecuta createActividad y retorna la respuesta', async () => {
    actividadRepository.createActividad.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(actividad);
    expect(actividadRepository.createActividad).toHaveBeenCalledWith(actividad);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.createActividad.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(actividad)).rejects.toThrow('DB error');
  });
});
