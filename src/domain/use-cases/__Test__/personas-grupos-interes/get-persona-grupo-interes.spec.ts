import { GetPersonaGrupoInteresUseCaseImpl } from '../../../';
import {
  PersonaGrupoInteres,
  PersonasGruposInteresRepository,
  RespuestaGrap,
} from '../../../';

describe('GetPersonaGrupoInteresUseCaseImpl', () => {
  const personasGruposInteresRepository: PersonasGruposInteresRepository = {
    getById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new GetPersonaGrupoInteresUseCaseImpl(
    personasGruposInteresRepository,
  );

  const mockPersonaGrupoInteres: PersonaGrupoInteres = {
    id: '1',
    nombre: 'Grupo Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama getById con el id correcto', async () => {
    (
      personasGruposInteresRepository.getById as jest.Mock
    ).mockResolvedValueOnce(mockPersonaGrupoInteres);
    await useCase.execute('1');
    expect(personasGruposInteresRepository.getById).toHaveBeenCalledWith('1');
  });

  it('retorna PersonaGrupoInteres correctamente', async () => {
    (
      personasGruposInteresRepository.getById as jest.Mock
    ).mockResolvedValueOnce(mockPersonaGrupoInteres);
    const result = await useCase.execute('2');
    expect(result).toBe(mockPersonaGrupoInteres);
  });

  it('retorna respuesta de error', async () => {
    (
      personasGruposInteresRepository.getById as jest.Mock
    ).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('3');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (
      personasGruposInteresRepository.getById as jest.Mock
    ).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('4')).rejects.toThrow('DB error');
  });
});
