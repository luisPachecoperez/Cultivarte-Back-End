import { GetPreEditActividadUseCaseImpl } from '../../Actividad/pre-edit-actividad';
import {
  PreEditActividad,
  ActividadRepository,
  RespuestaGrap,
  Actividad,
} from '../../../';

describe('GetPreEditActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    getPreEditActividad: jest.fn(),
  } as any;

  const useCase = new GetPreEditActividadUseCaseImpl(actividadRepository);

  const mockPreEdit: PreEditActividad = {
    id_programa: 'programa1',
    sedes: [],
    tiposDeActividad: [],
    aliados: [],
    responsables: [],
    nombresDeActividad: [],
    frecuencias: [],
    actividad: {} as Actividad,
    sesiones: [],
  };

  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna preEditActividad correctamente', async () => {
    actividadRepository.getPreEditActividad.mockResolvedValueOnce(mockPreEdit);
    const result = await useCase.execute('act1', 'user1');
    expect(actividadRepository.getPreEditActividad).toHaveBeenCalledWith(
      'act1',
      'user1',
    );
    expect(result).toBe(mockPreEdit);
  });

  it('retorna respuesta de error', async () => {
    actividadRepository.getPreEditActividad.mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('act1', 'user1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.getPreEditActividad.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('act1', 'user1')).rejects.toThrow('DB error');
  });
});
