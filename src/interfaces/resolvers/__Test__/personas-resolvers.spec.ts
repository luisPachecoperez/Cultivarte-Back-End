import { createPersonasResolvers } from '../personas-resolvers';
import { Persona } from '../../../domain';

describe('personasResolvers', () => {
  const mockPersona: Persona = {
    id_persona: '1',
    id_tipo_persona: 'TP',
    id_sexo: 'M',
    id_ubicacion: 'LOC',
    id_tipo_identificacion: 'CC',
    nombres: 'Juan',
  };

  const mockEditarBeneficiarios = {
    id_programa: '10',
    id_grupo_interes: '20',
    nuevos: [],
    modificados: [],
    eliminados: [],
  };

  let controllerMock: any;
  let resolvers: ReturnType<typeof createPersonasResolvers>;

  beforeEach(() => {
    controllerMock = {
      getPersonas: jest.fn().mockResolvedValue(['persona']),
      getPersona: jest.fn().mockResolvedValue(mockPersona),
      getAliadosSede: jest.fn().mockResolvedValue(['aliado']),
      getBenSedes: jest.fn().mockResolvedValue(['beneficiario']),
      getPreBeneficiarios: jest.fn().mockResolvedValue(['pre']),
      getPersonasParams: jest.fn().mockResolvedValue(['parametrizadas']),
      getPersonaByTipoIdenficacionNumeroIdentificacion: jest
        .fn()
        .mockResolvedValue(mockPersona),
      createPersona: jest.fn().mockResolvedValue(mockPersona),
      updatePersona: jest.fn().mockResolvedValue(mockPersona),
      deletePersona: jest.fn().mockResolvedValue({ exitoso: 'S', mensaje: 'ok' }),
      updateBeneficiarios: jest.fn().mockResolvedValue({ exitoso: 'S', mensaje: 'actualizado' }),
    };

    resolvers = createPersonasResolvers(controllerMock);
  });

  it('expone resolvers de Query y Mutation', () => {
    expect(resolvers.Query).toBeDefined();
    expect(resolvers.Mutation).toBeDefined();
  });

  it('delegates getPersonas to controller', async () => {
    const args = { limit: 5, offset: 15 };
    const result = await resolvers.Query.getPersonas({}, args);

    expect(controllerMock.getPersonas).toHaveBeenCalledWith(5, 15);
    expect(result).toEqual(['persona']);
  });

  it('delegates getPersona to controller', async () => {
    const args = { id: '1' };
    const result = await resolvers.Query.getPersona({}, args);

    expect(controllerMock.getPersona).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockPersona);
  });

  it('delegates getAliadosSede to controller', async () => {
    const args = { id_persona: '99' };
    const result = await resolvers.Query.getAliadosSede({}, args);

    expect(controllerMock.getAliadosSede).toHaveBeenCalledWith('99');
    expect(result).toEqual(['aliado']);
  });

  it('delegates getBeneficiariosSede to controller', async () => {
    const result = await resolvers.Query.getBeneficiariosSede();

    expect(controllerMock.getBenSedes).toHaveBeenCalledWith();
    expect(result).toEqual(['beneficiario']);
  });

  it('delegates getPreBeneficiarios to controller', async () => {
    const args = { id_usuario: 'user-1' };
    const result = await resolvers.Query.getPreBeneficiarios({}, args);

    expect(controllerMock.getPreBeneficiarios).toHaveBeenCalledWith('user-1');
    expect(result).toEqual(['pre']);
  });

  it('delegates getPersonasParams to controller', async () => {
    const args = {
      id_sede: 'sede-1',
      id_programa: 'prog-1',
      id_grupo_interes: 'grupo-1',
      limit: 3,
      offset: 6,
    };
    const result = await resolvers.Query.getPersonasParams({}, args);

    expect(controllerMock.getPersonasParams).toHaveBeenCalledWith(
      'sede-1',
      'prog-1',
      'grupo-1',
      3,
      6,
    );
    expect(result).toEqual(['parametrizadas']);
  });

  it('delegates getPersonaByTipoIdentificacionNumeroIdentificacion to controller', async () => {
    const args = { id_tipo_identificacion: 'CC', identificacion: '900' };
    const result = await resolvers.Query.getPersonaByTipoIdenficacionNumeroIdentificacion({}, args);

    expect(
      controllerMock.getPersonaByTipoIdenficacionNumeroIdentificacion,
    ).toHaveBeenCalledWith('CC', '900');
    expect(result).toEqual(mockPersona);
  });

  it('delegates createPersona to controller', async () => {
    const args = { data: mockPersona };
    const result = await resolvers.Mutation.createPersona({}, args);

    expect(controllerMock.createPersona).toHaveBeenCalledWith(mockPersona);
    expect(result).toEqual(mockPersona);
  });

  it('delegates updatePersona to controller', async () => {
    const args = { id: '1', data: mockPersona };
    const result = await resolvers.Mutation.updatePersona({}, args);

    expect(controllerMock.updatePersona).toHaveBeenCalledWith('1', mockPersona);
    expect(result).toEqual(mockPersona);
  });

  it('delegates deletePersona to controller', async () => {
    const args = { id: '1' };
    const result = await resolvers.Mutation.deletePersona({}, args);

    expect(controllerMock.deletePersona).toHaveBeenCalledWith('1');
    expect(result).toEqual({ exitoso: 'S', mensaje: 'ok' });
  });

  it('delegates updateBeneficiarios to controller', async () => {
    const args = { input: mockEditarBeneficiarios };
    const result = await resolvers.Mutation.updateBeneficiarios({}, args);

    expect(controllerMock.updateBeneficiarios).toHaveBeenCalledWith(
      mockEditarBeneficiarios,
    );
    expect(result).toEqual({ exitoso: 'S', mensaje: 'actualizado' });
  });
});
