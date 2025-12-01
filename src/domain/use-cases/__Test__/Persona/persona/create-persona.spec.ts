import { CreatePersonaUseCaseImpl } from '../../../persona/create-persona';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('CreatePersonaUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    createPersona: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreatePersonaUseCaseImpl(personasRepository);

  const mockPersona: Persona = {
    id_persona: '1',
    nombre: 'Persona Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna Persona correctamente', async () => {
    (personasRepository.createPersona as jest.Mock).mockResolvedValueOnce(
      mockPersona,
    );
    const result = await useCase.execute(mockPersona);
    expect(personasRepository.createPersona).toHaveBeenCalledWith(mockPersona);
    expect(result).toBe(mockPersona);
  });

  it('retorna respuesta de error', async () => {
    (personasRepository.createPersona as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(mockPersona);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasRepository.createPersona as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockPersona)).rejects.toThrow('DB error');
  });
});
