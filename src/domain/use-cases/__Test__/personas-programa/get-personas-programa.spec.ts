import { GetPersonasProgramaUseCaseImpl } from '../../personas-programa/get-personas-programa';
import {
  PersonaPrograma,
  PersonasProgramaRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonasProgramaUseCaseImpl', () => {
  const personasProgramaRepository: PersonasProgramaRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonasProgramaUseCaseImpl(
    personasProgramaRepository,
  );

  const mockPersonasPrograma: PersonaPrograma[] = [
    { id: '1', nombre: 'Programa 1' } as any,
    { id: '2', nombre: 'Programa 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de PersonaPrograma correctamente', async () => {
    (personasProgramaRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockPersonasPrograma,
    );
    const result = await useCase.execute(1,100);
    expect(personasProgramaRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockPersonasPrograma);
  });

  it('retorna respuesta de error', async () => {
    (personasProgramaRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(1,100);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasProgramaRepository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(1,100)).rejects.toThrow('DB error');
  });
});
