import { PersonasGruposInteresController } from '../personas-grupos-interes-controller';
import {
  DeletePersonaGrupoInteresUseCase,
  GetPersonaGrupoInteresUseCase,
  GetPersonasGrupoInteresUseCase,
  UpdatePersonaGrupoInteresUseCase,
  CreatePersonaGrupoInteresUseCase,
  PersonaGrupoInteres,
  RespuestaGrap,
} from '../../../domain';

describe('PersonasGruposInteresController', () => {
  const getPersonaGrupoInteresByIdUseCase = { execute: jest.fn() };
  const getPersonasGrupoInteresUseCase = { execute: jest.fn() };
  const createPersonaGrupoInteresUseCase = { execute: jest.fn() };
  const updatePersonaGrupoInteresUseCase = { execute: jest.fn() };
  const deletePersonaGrupoInteresUseCase = { execute: jest.fn() };

  const controller = new PersonasGruposInteresController(
    getPersonaGrupoInteresByIdUseCase as GetPersonaGrupoInteresUseCase,
    getPersonasGrupoInteresUseCase as GetPersonasGrupoInteresUseCase,
    createPersonaGrupoInteresUseCase as CreatePersonaGrupoInteresUseCase,
    updatePersonaGrupoInteresUseCase as UpdatePersonaGrupoInteresUseCase,
    deletePersonaGrupoInteresUseCase as DeletePersonaGrupoInteresUseCase,
  );

  const mockPersonaGrupoInteres: PersonaGrupoInteres = {
    id_persona_grupo_interes: '1',
    id_persona: 'persona1',
    id_grupo_interes: 'grupo1',
    // Add other properties if required by the PersonaGrupoInteres interface
  } as PersonaGrupoInteres;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getPersonaGrupoInteresById - success', async () => {
    getPersonaGrupoInteresByIdUseCase.execute.mockResolvedValueOnce(
      mockPersonaGrupoInteres,
    );
    await expect(controller.getPersonaGrupoInteresById('1')).resolves.toBe(
      mockPersonaGrupoInteres,
    );
    expect(getPersonaGrupoInteresByIdUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getPersonaGrupoInteresById - error', async () => {
    getPersonaGrupoInteresByIdUseCase.execute.mockResolvedValueOnce(
      mockRespuesta,
    );
    await expect(controller.getPersonaGrupoInteresById('1')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getPersonasGrupoInteres - success', async () => {
    getPersonasGrupoInteresUseCase.execute.mockResolvedValueOnce([
      mockPersonaGrupoInteres,
    ]);
    await expect(controller.getPersonasGrupoInteres()).resolves.toEqual([
      mockPersonaGrupoInteres,
    ]);
    expect(getPersonasGrupoInteresUseCase.execute).toHaveBeenCalled();
  });

  it('getPersonasGrupoInteres - error', async () => {
    getPersonasGrupoInteresUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPersonasGrupoInteres()).resolves.toBe(
      mockRespuesta,
    );
  });

  it('createPersonaGrupoInteres - success', async () => {
    createPersonaGrupoInteresUseCase.execute.mockResolvedValueOnce(
      mockRespuesta,
    );
    await expect(
      controller.createPersonaGrupoInteres(mockPersonaGrupoInteres),
    ).resolves.toBe(mockRespuesta);
    expect(createPersonaGrupoInteresUseCase.execute).toHaveBeenCalledWith(
      mockPersonaGrupoInteres,
    );
  });

  it('updatePersonaGrupoInteres - success', async () => {
    updatePersonaGrupoInteresUseCase.execute.mockResolvedValueOnce(
      mockRespuesta,
    );
    await expect(
      controller.updatePersonaGrupoInteres('1', mockPersonaGrupoInteres),
    ).resolves.toBe(mockRespuesta);
    expect(updatePersonaGrupoInteresUseCase.execute).toHaveBeenCalledWith(
      '1',
      mockPersonaGrupoInteres,
    );
  });

  it('deletePersonaGrupoInteres - success', async () => {
    deletePersonaGrupoInteresUseCase.execute.mockResolvedValueOnce(
      mockRespuesta,
    );
    await expect(controller.deletePersonaGrupoInteres('1')).resolves.toBe(
      mockRespuesta,
    );
    expect(deletePersonaGrupoInteresUseCase.execute).toHaveBeenCalledWith('1');
  });
});
