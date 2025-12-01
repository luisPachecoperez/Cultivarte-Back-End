import { GetPersonaProgramaUseCaseImpl } from '../../personas-programa/get-persona-programa';
import {
  PersonaPrograma,
  PersonasProgramaRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonaProgramaUseCaseImpl', () => {
  const personasProgramaRepository: PersonasProgramaRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonaProgramaUseCaseImpl(personasProgramaRepository);

  const mockPersonaPrograma: PersonaPrograma = {
    id: '1',
    nombre: 'Programa Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getById con el id correcto', async () => {
    (personasProgramaRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockPersonaPrograma,
    );
    await useCase.execute('1');
    expect(personasProgramaRepository.getById).toHaveBeenCalledWith('1');
  });

  it('retorna PersonaPrograma correctamente', async () => {
    (personasProgramaRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockPersonaPrograma,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockPersonaPrograma);
  });

  it('retorna respuesta de error', async () => {
    (personasProgramaRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('3');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasProgramaRepository.getById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('4')).rejects.toThrow('DB error');
  });
});
