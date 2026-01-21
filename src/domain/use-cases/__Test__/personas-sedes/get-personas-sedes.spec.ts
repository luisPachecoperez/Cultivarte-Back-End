import { GetPersonasSedesUseCaseImpl } from '../../personas-sedes/get-personas-sedes';
import {
  PersonasSede,
  PersonasSedesRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonasSedesUseCaseImpl', () => {
  const personaSedeRepository: PersonasSedesRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonasSedesUseCaseImpl(personaSedeRepository);

  const mockPersonasSede: PersonasSede[] = [
    { id: '1', nombre: 'Sede 1' } as any,
    { id: '2', nombre: 'Sede 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de PersonasSede correctamente', async () => {
    (personaSedeRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockPersonasSede,
    );
    const result = await useCase.execute(1,100);
    expect(personaSedeRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockPersonasSede);
  });

  it('retorna respuesta de error', async () => {
    (personaSedeRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(1,100);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personaSedeRepository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(1,100)).rejects.toThrow('DB error');
  });
});
