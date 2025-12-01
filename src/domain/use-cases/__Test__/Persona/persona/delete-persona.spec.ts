import { DeletePersonaUseCaseImpl } from '../../../persona/delete-persona';
import { PersonaRepository, RespuestaGrap } from '../../../../';

describe('DeletePersonaUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    deletePersona: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new DeletePersonaUseCaseImpl(personasRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama deletePersona con el id correcto', async () => {
    (personasRepository.deletePersona as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute('1');
    expect(personasRepository.deletePersona).toHaveBeenCalledWith('1');
  });

  it('retorna la respuesta del repositorio', async () => {
    (personasRepository.deletePersona as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasRepository.deletePersona as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
