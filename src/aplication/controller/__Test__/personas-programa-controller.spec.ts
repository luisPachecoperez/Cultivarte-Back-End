import { PersonasProgramaController } from '../personas-programa-controller';
import {
  CreatePersonaProgramaUseCase,
  DeletePersonaProgramaUseCase,
  GetPersonaProgramaUseCase,
  GetPersonasProgramaUseCase,
  UpdatePersonaProgramaUseCase,
  PersonaPrograma,
  RespuestaGrap,
} from '../../../domain';

describe('PersonasProgramaController', () => {
  const createPersonaProgramaUseCase = { execute: jest.fn() };
  const updatePersonaProgramaUseCase = { execute: jest.fn() };
  const deletePersonaProgramaUseCase = { execute: jest.fn() };
  const getPersonaProgramaUseCase = { execute: jest.fn() };
  const getPersonasProgramaUseCase = { execute: jest.fn() };

  const controller = new PersonasProgramaController(
    createPersonaProgramaUseCase as CreatePersonaProgramaUseCase,
    updatePersonaProgramaUseCase as UpdatePersonaProgramaUseCase,
    deletePersonaProgramaUseCase as DeletePersonaProgramaUseCase,
    getPersonaProgramaUseCase as GetPersonaProgramaUseCase,
    getPersonasProgramaUseCase as GetPersonasProgramaUseCase,
  );

  const mockPersonaPrograma: PersonaPrograma = {
    id_persona_programa: '1',
    id_persona: '1',
    id_programa: '1',
    id_creado_por: '1',
    fecha_creacion: new Date(),
    id_modificado_por: '1',
    fecha_modificacion: new Date(),
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createPersonaPrograma - success', async () => {
    createPersonaProgramaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(
      controller.createPersonaPrograma(mockPersonaPrograma),
    ).resolves.toBe(mockRespuesta);
    expect(createPersonaProgramaUseCase.execute).toHaveBeenCalledWith(
      mockPersonaPrograma,
    );
  });

  it('updatePersonaPrograma - success', async () => {
    updatePersonaProgramaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(
      controller.updatePersonaPrograma('1', mockPersonaPrograma),
    ).resolves.toBe(mockRespuesta);
    expect(updatePersonaProgramaUseCase.execute).toHaveBeenCalledWith(
      '1',
      mockPersonaPrograma,
    );
  });

  it('deletePersonaPrograma - success', async () => {
    deletePersonaProgramaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.deletePersonaPrograma('1')).resolves.toBe(
      mockRespuesta,
    );
    expect(deletePersonaProgramaUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getPersonaPrograma - success', async () => {
    getPersonaProgramaUseCase.execute.mockResolvedValueOnce(
      mockPersonaPrograma,
    );
    await expect(controller.getPersonaPrograma('1')).resolves.toBe(
      mockPersonaPrograma,
    );
    expect(getPersonaProgramaUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getPersonaPrograma - error', async () => {
    getPersonaProgramaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPersonaPrograma('1')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getPersonasPrograma - success', async () => {
    getPersonasProgramaUseCase.execute.mockResolvedValueOnce([
      mockPersonaPrograma,
    ]);
    await expect(controller.getPersonasPrograma()).resolves.toEqual([
      mockPersonaPrograma,
    ]);
    expect(getPersonasProgramaUseCase.execute).toHaveBeenCalled();
  });

  it('getPersonasPrograma - error', async () => {
    getPersonasProgramaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPersonasPrograma()).resolves.toBe(mockRespuesta);
  });
});
