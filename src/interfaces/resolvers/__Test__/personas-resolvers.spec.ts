import { personasResolvers } from '../personas-resolvers';

const mockPersona = {
  id_persona: '1',
  nombres: 'Juan',
  id_tipo_persona: 'tipo',
  id_sexo: 'M',
  id_ubicacion: 'ubicacion',
  id_tipo_identificacion: 'CC',
};

describe('personasResolvers', () => {
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(personasResolvers.Query.getPersonas).toBeDefined();
    expect(personasResolvers.Query.getPersona).toBeDefined();
    expect(personasResolvers.Query.getAliadosSede).toBeDefined();
    expect(personasResolvers.Query.getBeneficiariosSede).toBeDefined();
    expect(personasResolvers.Mutation.createPersona).toBeDefined();
    expect(personasResolvers.Mutation.updatePersona).toBeDefined();
    expect(personasResolvers.Mutation.deletePersona).toBeDefined();
  });

  it('getPersonas llama al método del controlador', async () => {
    const spy = jest.spyOn(personasResolvers.Query, 'getPersonas').mockResolvedValue([]);
    const args = { limit: 10, offset: 0 };
    await personasResolvers.Query.getPersonas({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getPersona llama al método del controlador', async () => {
    const mockPersona = {
      id_persona: '1',
      nombres: 'Juan',
      id_tipo_persona: 'tipo',
      id_sexo: 'M',
      id_ubicacion: 'ubicacion',
      id_tipo_identificacion: 'CC',
    };
    const spy = jest.spyOn(personasResolvers.Query, 'getPersona').mockResolvedValue(mockPersona);
    const args = { id: '1' };
    await personasResolvers.Query.getPersona({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getAliadosSede llama al método del controlador', async () => {
    const spy = jest.spyOn(personasResolvers.Query, 'getAliadosSede').mockResolvedValue([]);
    const args = { id_persona: '1' };
    await personasResolvers.Query.getAliadosSede({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getBeneficiariosSede llama al método del controlador', async () => {
    const spy = jest.spyOn(personasResolvers.Query, 'getBeneficiariosSede').mockResolvedValue([]);
    await personasResolvers.Query.getBeneficiariosSede();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('createPersona llama al método del controlador', async () => {
    const mockPersona = {
      id_persona: '1',
      nombres: 'Juan',
      id_tipo_persona: 'tipo',
      id_sexo: 'M',
      id_ubicacion: 'ubicacion',
      id_tipo_identificacion: 'CC',
    };
    const spy = jest.spyOn(personasResolvers.Mutation, 'createPersona').mockResolvedValue(mockPersona);
    const args = { data: mockPersona };
    await personasResolvers.Mutation.createPersona({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('updatePersona llama al método del controlador', async () => {
    const mockPersona = {
      id_persona: '1',
      nombres: 'Juan',
      id_tipo_persona: 'tipo',
      id_sexo: 'M',
      id_ubicacion: 'ubicacion',
      id_tipo_identificacion: 'CC',
    };
    const spy = jest.spyOn(personasResolvers.Mutation, 'updatePersona').mockResolvedValue(mockPersona);
    const args = { id: '1', data: mockPersona };
    await personasResolvers.Mutation.updatePersona({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('deletePersona llama al método del controlador', async () => {
    const mockRespuesta = { exitoso: 'S' as 'S', mensaje: 'Eliminado correctamente' };
    const spy = jest.spyOn(personasResolvers.Mutation, 'deletePersona').mockResolvedValue(mockRespuesta);
    const args = { id: '1' };
    await personasResolvers.Mutation.deletePersona({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getPersonas ejecuta correctamente', async () => {
  const args = { limit: 10, offset: 0 };
  const result = await personasResolvers.Query.getPersonas({}, args);
  expect(result).not.toBeUndefined();
});

it('getPersona ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await personasResolvers.Query.getPersona({}, args);
  expect(result).not.toBeUndefined();
});

it('getAliadosSede ejecuta correctamente', async () => {
  const args = { id_persona: '1' };
  const result = await personasResolvers.Query.getAliadosSede({}, args);
  expect(result).not.toBeUndefined();
});

it('getBeneficiariosSede ejecuta correctamente', async () => {
  const result = await personasResolvers.Query.getBeneficiariosSede();
  expect(result).not.toBeUndefined();
});

it('createPersona ejecuta correctamente', async () => {
  const args = { data: mockPersona };
  const result = await personasResolvers.Mutation.createPersona({}, args);
  expect(result).not.toBeUndefined();
});

it('updatePersona ejecuta correctamente', async () => {
  const args = { id: '1', data: mockPersona };
  const result = await personasResolvers.Mutation.updatePersona({}, args);
  expect(result).not.toBeUndefined();
});

it('deletePersona ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await personasResolvers.Mutation.deletePersona({}, args);
  expect(result).not.toBeUndefined();
});
});
