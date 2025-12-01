import { GetAliadosSedeUseCaseImpl } from '../../../persona/get-aliados-sede';
import { PersonaRepository, Persona, RespuestaGrap } from '../../../../';

describe('GetAliadosSedeUseCaseImpl', () => {
  const personasRepository: PersonaRepository = {
    getAliadosSede: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetAliadosSedeUseCaseImpl(personasRepository);

  const mockPersonas: Persona[] = [
    { id_persona: '1', nombre: 'Aliado 1' } as any,
    { id_persona: '2', nombre: 'Aliado 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de personas si el repositorio retorna array', async () => {
    (personasRepository.getAliadosSede as jest.Mock).mockResolvedValueOnce(
      mockPersonas,
    );
    const result = await useCase.execute('1');
    expect(personasRepository.getAliadosSede).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockPersonas);
  });

  it('retorna array vacío si el repositorio retorna un objeto no array', async () => {
    (personasRepository.getAliadosSede as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2');
    expect(result).toEqual([]);
  });

  it('retorna array vacío si el repositorio lanza error', async () => {
    (personasRepository.getAliadosSede as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    const result = await useCase.execute('3');
    expect(result).toEqual([]);
  });
});
