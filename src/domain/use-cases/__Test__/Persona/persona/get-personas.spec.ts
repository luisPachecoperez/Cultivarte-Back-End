import { GetPersonasUseCaseImpl } from '../../../persona/get-personas';
import { Persona, PersonaRepository, RespuestaGrap } from '../../../../';

describe('GetPersonasUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonasUseCaseImpl(personasRepository);

  const mockPersonas: Persona[] = [
    { id_persona: '1', nombre: 'Persona 1' } as any,
    { id_persona: '2', nombre: 'Persona 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de personas correctamente', async () => {
    (personasRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockPersonas,
    );
    const result = await useCase.execute(10, 0);
    expect(personasRepository.getAll).toHaveBeenCalledWith(10, 0);
    expect(result).toBe(mockPersonas);
  });

  it('retorna respuesta de error', async () => {
    (personasRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(5, 2);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasRepository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(1, 1)).rejects.toThrow('DB error');
  });
});
