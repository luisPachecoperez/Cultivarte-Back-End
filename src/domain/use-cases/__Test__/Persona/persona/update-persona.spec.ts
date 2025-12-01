import { UpdatePersonaUseCaseImpl } from '../../../persona/update-persona';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('UpdatePersonaUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    updatePersona: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdatePersonaUseCaseImpl(personasRepository);

  const mockPersona: Persona = {
    id_persona: '1',
    nombre: 'Persona Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updatePersona con los argumentos correctos', async () => {
    (personasRepository.updatePersona as jest.Mock).mockResolvedValueOnce(
      mockPersona,
    );
    await useCase.execute('1', mockPersona);
    expect(personasRepository.updatePersona).toHaveBeenCalledWith(
      '1',
      mockPersona,
    );
  });

  it('retorna Persona correctamente', async () => {
    (personasRepository.updatePersona as jest.Mock).mockResolvedValueOnce(
      mockPersona,
    );
    const result = await useCase.execute('2', mockPersona);
    expect(result).toBe(mockPersona);
  });

  it('retorna respuesta de error', async () => {
    (personasRepository.updatePersona as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('3', mockPersona);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasRepository.updatePersona as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('4', mockPersona)).rejects.toThrow('DB error');
  });
});
