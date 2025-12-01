import { CreatePersonaGrupoInteresUseCaseImpl } from '../../../use-cases/personas-grupo-interes/create-persona-grupo-interes';
import {
  PersonaGrupoInteres,
  PersonasGruposInteresRepository,
  RespuestaGrap,
} from '../../../';

describe('CreatePersonaGrupoInteresUseCaseImpl', () => {
  const personasGruposInteresRepository: PersonasGruposInteresRepository = {
    create: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new CreatePersonaGrupoInteresUseCaseImpl(
    personasGruposInteresRepository,
  );

  const mockPersonaGrupoInteres: PersonaGrupoInteres = {
    id: '1',
    nombre: 'Grupo Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Creado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama create con el argumento correcto', async () => {
    (personasGruposInteresRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    await useCase.execute(mockPersonaGrupoInteres);
    expect(personasGruposInteresRepository.create).toHaveBeenCalledWith(
      mockPersonaGrupoInteres,
    );
  });

  it('retorna la respuesta del repositorio', async () => {
    (personasGruposInteresRepository.create as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute(mockPersonaGrupoInteres);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (personasGruposInteresRepository.create as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute(mockPersonaGrupoInteres)).rejects.toThrow(
      'DB error',
    );
  });
});
