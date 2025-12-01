import { GetCalendarioFechaUseCaseImpl } from '../../calendario/get-calendario-fecha';
import {
  CalendarioInput,
  Evento,
  CalendarioFechaRepository,
  RespuestaGrap,
} from '../../../';

describe('GetCalendarioFechaUseCaseImpl', () => {
  const calendarioFechaRepository: jest.Mocked<CalendarioFechaRepository> = {
    getByDate: jest.fn(),
  } as any;

  const useCase = new GetCalendarioFechaUseCaseImpl(calendarioFechaRepository);

  const mockInput: CalendarioInput = {
    fecha_inicial: '2024-01-01',
    fecha_final: '2024-01-01',
    id_usuario: '123',
  };
  const mockEvento: Evento = {
    id_actividad: '1',
    id_sesion: '1',
    nombre_actividad: 'Evento',
    desde: '2024-01-01T10:00:00',
    hasta: '2024-01-01T12:00:00',
    asistentes_evento: 10,
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna eventos correctamente', async () => {
    calendarioFechaRepository.getByDate.mockResolvedValueOnce([mockEvento]);
    const result = await useCase.execute(mockInput);
    expect(calendarioFechaRepository.getByDate).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual([mockEvento]);
  });

  it('retorna respuesta de error', async () => {
    calendarioFechaRepository.getByDate.mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockInput);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    calendarioFechaRepository.getByDate.mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockInput)).rejects.toThrow('DB error');
  });
});
