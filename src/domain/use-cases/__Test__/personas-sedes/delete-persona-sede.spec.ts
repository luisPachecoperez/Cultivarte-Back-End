import { DeletePersonaSedeUseCaseImpl } from '../../personas-sedes/delete-persona-sede';
import { PersonasSedesRepository, RespuestaGrap } from '../../../';

describe('DeletePersonaSedeUseCaseImpl', () => {
  const personaSedeRepository: PersonasSedesRepository = {
    deleteById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new DeletePersonaSedeUseCaseImpl(personaSedeRepository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama deleteById con el id correcto', async () => {
    (personaSedeRepository.deleteById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute('1');
    expect(personaSedeRepository.deleteById).toHaveBeenCalledWith('1');
  });

  it('retorna la respuesta del repositorio', async () => {
    (personaSedeRepository.deleteById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personaSedeRepository.deleteById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
