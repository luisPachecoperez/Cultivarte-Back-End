import { GetPreCreateActividadUseCaseImpl } from '../../Actividad/pre-create-actividad';
import {
  PreCreateActividad,
  ActividadRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPreCreateActividadUseCaseImpl', () => {
  const actividadRepository: jest.Mocked<ActividadRepository> = {
    getPreCreateActividad: jest.fn(),
  } as any;

  const useCase = new GetPreCreateActividadUseCaseImpl(actividadRepository);

  const mockPreCreate: PreCreateActividad = {
    id_programa: '1',
    sedes: [],
    tiposDeActividad: [],
    aliados: [],
    responsables: [],
    nombresDeActividad: [],
    frecuencias: [],
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna preCreateActividad correctamente', async () => {
    actividadRepository.getPreCreateActividad.mockResolvedValueOnce(
      mockPreCreate,
    );
    const result = await useCase.execute('user1');
    expect(actividadRepository.getPreCreateActividad).toHaveBeenCalledWith(
      'user1',
    );
    expect(result).toBe(mockPreCreate);
  });

  it('retorna respuesta de error', async () => {
    actividadRepository.getPreCreateActividad.mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('user1');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    actividadRepository.getPreCreateActividad.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('user1')).rejects.toThrow('DB error');
  });
});
