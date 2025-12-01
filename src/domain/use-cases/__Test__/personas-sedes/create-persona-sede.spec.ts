import { CreatePersonaSedeUseCaseImpl } from '../../personas-sedes/create-persona-sede';
import {
  PersonasSede,
  PersonasSedesRepository,
  RespuestaGrap,
} from '../../../';

describe('CreatePersonaSedeUseCaseImpl', () => {
  const personaSedeRepository: PersonasSedesRepository = {
    create: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreatePersonaSedeUseCaseImpl(personaSedeRepository);

  const mockPersonaSede: PersonasSede = { id: '1', nombre: 'Sede Test' } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama create con el argumento correcto', async () => {
    (personaSedeRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute(mockPersonaSede);
    expect(personaSedeRepository.create).toHaveBeenCalledWith(mockPersonaSede);
  });

  it('retorna la respuesta del repositorio', async () => {
    (personaSedeRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(mockPersonaSede);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personaSedeRepository.create as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockPersonaSede)).rejects.toThrow('DB error');
  });
});
