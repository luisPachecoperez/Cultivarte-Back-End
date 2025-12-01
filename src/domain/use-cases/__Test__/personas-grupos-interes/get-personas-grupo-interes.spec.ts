import { GetPersonasGrupoInteresUseCaseImpl } from '../../../';
import {
  PersonaGrupoInteres,
  PersonasGruposInteresRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonasGrupoInteresUseCaseImpl', () => {
  const personasGruposInteresRepository: PersonasGruposInteresRepository = {
    getAll: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonasGrupoInteresUseCaseImpl(
    personasGruposInteresRepository,
  );

  const mockPersonasGrupoInteres: PersonaGrupoInteres[] = [
    { id: '1', nombre: 'Grupo 1' } as any,
    { id: '2', nombre: 'Grupo 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de PersonaGrupoInteres correctamente', async () => {
    (personasGruposInteresRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockPersonasGrupoInteres,
    );
    const result = await useCase.execute();
    expect(personasGruposInteresRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockPersonasGrupoInteres);
  });

  it('retorna respuesta de error', async () => {
    (personasGruposInteresRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasGruposInteresRepository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
