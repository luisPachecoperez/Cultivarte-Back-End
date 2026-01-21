import { PersonasController } from '../personas-controller';
import {
  Persona,
  CreatePersonaUseCase,
  UpdatePersonaUseCase,
  DeletePersonaUseCase,
  GetPersonaUseCase,
  GetPersonasUseCase,
  GetAliadosSedeUseCase,
  GetBeneficiariosSedeUseCase,
  RespuestaGrap,
  GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase,
  GetPersonasParamsUseCase,
  GetPreBeneficiarioUseCase,
  UpdateBeneficiariosUseCase,
} from '../../../domain';

describe('PersonasController', () => {
  const getPersonaUseCase = { execute: jest.fn() };
  const getPersonasUseCase = { execute: jest.fn() };
  const getAliadosSedeUseCase = { execute: jest.fn() };
  const getBeneficiariosSedeUseCase = { execute: jest.fn() };
  const createPersonaUseCase = { execute: jest.fn() };
  const updatePersonaUseCase = { execute: jest.fn() };
  const deletePersonaUseCase = { execute: jest.fn() };
  const getPersonaByTipoIdenficacionNumeroIdentificacionUseCase = { execute: jest.fn() };
  const getPersonasParamsUseCase = { execute: jest.fn() };
  const getPreBeneficiariosUseCase = { execute: jest.fn() };
  const updateBeneficiariosUseCase = { execute: jest.fn() };

  const controller = new PersonasController(
    getPersonaUseCase as GetPersonaUseCase,
    getPersonasUseCase as GetPersonasUseCase,
    getAliadosSedeUseCase as GetAliadosSedeUseCase,
    getBeneficiariosSedeUseCase as GetBeneficiariosSedeUseCase,
    getPersonaByTipoIdenficacionNumeroIdentificacionUseCase as GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase,
    getPersonasParamsUseCase as GetPersonasParamsUseCase,
    getPreBeneficiariosUseCase as GetPreBeneficiarioUseCase,
    updateBeneficiariosUseCase as UpdateBeneficiariosUseCase,
    createPersonaUseCase as CreatePersonaUseCase,
    updatePersonaUseCase as UpdatePersonaUseCase,
    deletePersonaUseCase as DeletePersonaUseCase,
  );

  const mockPersona: Persona = {
    nombres: 'Test',
    id_persona: '1',
    id_tipo_persona: 'tipo1',
    id_sexo: 'sexo1',
    id_ubicacion: 'ubicacion1',
    id_tipo_identificacion: 'identificacion1',
  };
  const mockPersonaSede: Persona = {
    id_persona: '1',
    id_tipo_persona: 'tipo1',
    id_sexo: 'sexo1',
    id_ubicacion: 'ubicacion1',
    id_tipo_identificacion: 'identificacion1',
    id_sede: 'sede1',
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createPersona - success', async () => {
    createPersonaUseCase.execute.mockResolvedValueOnce(mockPersona);
    await expect(controller.createPersona(mockPersona)).resolves.toBe(
      mockPersona,
    );
    expect(createPersonaUseCase.execute).toHaveBeenCalledWith(mockPersona);
  });

  it('createPersona - error', async () => {
    createPersonaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.createPersona(mockPersona)).resolves.toBe(
      mockRespuesta,
    );
  });

  it('updatePersona - success', async () => {
    updatePersonaUseCase.execute.mockResolvedValueOnce(mockPersona);
    await expect(controller.updatePersona('1', mockPersona)).resolves.toBe(
      mockPersona,
    );
    expect(updatePersonaUseCase.execute).toHaveBeenCalledWith('1', mockPersona);
  });

  it('updatePersona - error', async () => {
    updatePersonaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.updatePersona('1', mockPersona)).resolves.toBe(
      mockRespuesta,
    );
  });

  it('deletePersona - success', async () => {
    deletePersonaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.deletePersona('1')).resolves.toBe(mockRespuesta);
    expect(deletePersonaUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getPersona - success', async () => {
    getPersonaUseCase.execute.mockResolvedValueOnce(mockPersona);
    await expect(controller.getPersona('1')).resolves.toBe(mockPersona);
    expect(getPersonaUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getPersona - error', async () => {
    getPersonaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPersona('1')).resolves.toBe(mockRespuesta);
  });

  it('getPersonas - success', async () => {
    getPersonasUseCase.execute.mockResolvedValueOnce([mockPersona]);
    await expect(controller.getPersonas(10, 0)).resolves.toEqual([mockPersona]);
    expect(getPersonasUseCase.execute).toHaveBeenCalledWith(10, 0);
  });

  it('getPersonas - error', async () => {
    getPersonasUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPersonas(10, 0)).resolves.toBe(mockRespuesta);
  });

  it('getAliadosSede - success', async () => {
    getAliadosSedeUseCase.execute.mockResolvedValueOnce([mockPersona]);
    await expect(controller.getAliadosSede('user')).resolves.toEqual([
      mockPersona,
    ]);
    expect(getAliadosSedeUseCase.execute).toHaveBeenCalledWith('user');
  });

  it('getAliadosSede - error', async () => {
    getAliadosSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getAliadosSede('user')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getBeneficiariosSede - success', async () => {
    getBeneficiariosSedeUseCase.execute.mockResolvedValueOnce([
      mockPersonaSede,
    ]);
    await expect(controller.getBenSedes()).resolves.toEqual([
      mockPersonaSede,
    ]);
    expect(getBeneficiariosSedeUseCase.execute).toHaveBeenCalled();
  });

  it('getBenSedes - error', async () => {
    getBeneficiariosSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getBenSedes()).resolves.toBe(
      mockRespuesta,
    );
  });
});
