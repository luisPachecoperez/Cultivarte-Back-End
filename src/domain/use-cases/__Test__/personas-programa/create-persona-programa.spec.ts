import { CreatePersonaProgramaUseCaseImpl } from '../../personas-programa/create-persona-programa';
import {
  PersonaPrograma,
  PersonasProgramaRepository,
  RespuestaGrap,
} from '../../../';

describe('CreatePersonaProgramaUseCaseImpl', () => {
  const personasProgramaRepository: PersonasProgramaRepository = {
    create: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreatePersonaProgramaUseCaseImpl(
    personasProgramaRepository,
  );

  const mockPersonaPrograma: PersonaPrograma = {
    id: '1',
    nombre: 'Programa Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama create con el argumento correcto', async () => {
    (personasProgramaRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute(mockPersonaPrograma);
    expect(personasProgramaRepository.create).toHaveBeenCalledWith(
      mockPersonaPrograma,
    );
  });

  it('retorna la respuesta del repositorio', async () => {
    (personasProgramaRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(mockPersonaPrograma);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasProgramaRepository.create as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockPersonaPrograma)).rejects.toThrow(
      'DB error',
    );
  });
});
