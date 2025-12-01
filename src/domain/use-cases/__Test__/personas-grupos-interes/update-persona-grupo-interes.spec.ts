import { UpdatePersonaGrupoInteresUseCaseImpl } from '../../../';
import {
  PersonaGrupoInteres,
  PersonasGruposInteresRepository,
  RespuestaGrap,
} from '../../../';

describe('UpdatePersonaGrupoInteresUseCaseImpl', () => {
  const personasGruposInteresRepository: PersonasGruposInteresRepository = {
    updateById: jest.fn(),
    // agrega otros métodos si tu interfaz los requiere
  } as any;

  const useCase = new UpdatePersonaGrupoInteresUseCaseImpl(
    personasGruposInteresRepository,
  );

  const mockPersonaGrupoInteres: PersonaGrupoInteres = {
    id: '1',
    nombre: 'Grupo Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateById con los argumentos correctos', async () => {
    (
      personasGruposInteresRepository.updateById as jest.Mock
    ).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1', mockPersonaGrupoInteres);
    expect(personasGruposInteresRepository.updateById).toHaveBeenCalledWith(
      '1',
      mockPersonaGrupoInteres,
    );
  });

  it('retorna la respuesta del repositorio', async () => {
    (
      personasGruposInteresRepository.updateById as jest.Mock
    ).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2', mockPersonaGrupoInteres);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (
      personasGruposInteresRepository.updateById as jest.Mock
    ).mockRejectedValueOnce(new Error('DB error'));
    await expect(useCase.execute('3', mockPersonaGrupoInteres)).rejects.toThrow(
      'DB error',
    );
  });
});
