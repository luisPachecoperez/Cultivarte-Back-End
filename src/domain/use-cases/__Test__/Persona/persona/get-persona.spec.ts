import { GetPersonaUseCaseImpl } from '../../../persona/get-persona';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('GetPersonaUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonaUseCaseImpl(personasRepository);

  const mockPersona: Persona = {
    id_persona: '1',
    nombre: 'Persona Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna Persona correctamente', async () => {
    (personasRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockPersona,
    );
    const result = await useCase.execute('1');
    expect(personasRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockPersona);
  });

  it('retorna respuesta de error', async () => {
    (personasRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasRepository.getById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
