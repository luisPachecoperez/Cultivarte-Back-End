import { GetPersonaSedeUseCaseImpl } from '../../personas-sedes/get-persona-sede';
import {
  PersonasSede,
  PersonasSedesRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonaSedeUseCaseImpl', () => {
  const personaSedeRepository: PersonasSedesRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonaSedeUseCaseImpl(personaSedeRepository);

  const mockPersonaSede: PersonasSede = { id: '1', nombre: 'Sede Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getById con el id correcto', async () => {
    (personaSedeRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockPersonaSede,
    );
    await useCase.execute('1');
    expect(personaSedeRepository.getById).toHaveBeenCalledWith('1');
  });

  it('retorna PersonasSede correctamente', async () => {
    (personaSedeRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockPersonaSede,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockPersonaSede);
  });

  it('retorna respuesta de error', async () => {
    (personaSedeRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('3');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personaSedeRepository.getById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('4')).rejects.toThrow('DB error');
  });
});
