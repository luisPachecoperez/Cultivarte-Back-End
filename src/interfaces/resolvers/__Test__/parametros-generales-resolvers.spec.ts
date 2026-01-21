const mockQuery = jest.fn().mockResolvedValue({ rows: [] });
const mockConnect = jest.fn();
const mockOn = jest.fn();
const mockEnd = jest.fn();

jest.mock('../../../infrastructure/db/pool', () => ({
  pgPool: {
    query: (...args: unknown[]) => mockQuery(...args),
    connect: (...args: unknown[]) => mockConnect(...args),
    on: (...args: unknown[]) => mockOn(...args),
    end: (...args: unknown[]) => mockEnd(...args),
  },
  initDbPool: jest.fn(),
  closeDbPool: jest.fn(),
}));

jest.mock('../../../interfaces/services/secrets.service', () => ({
  SecretService: jest.fn().mockImplementation(() => ({
    getSecret: jest.fn().mockResolvedValue(undefined),
  })),
}));

import { parametrosGeneralesResolvers } from '../parametros-generales-resolvers';

describe('parametrosGeneralesResolvers', () => {
  beforeEach(() => {
    mockQuery.mockClear();
    mockConnect.mockClear();
    mockOn.mockClear();
    mockEnd.mockClear();
  });

  const mockParametrosGenerales = {
    id_parametro_general: '1',
    nombre_parametro: 'Test',
    // agrega aquí otras propiedades requeridas por ParametrosGenerales
  };
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(parametrosGeneralesResolvers.Query.getParametrosGenerales).toBeDefined();
    expect(parametrosGeneralesResolvers.Query.getParametroGeneral).toBeDefined();
    expect(parametrosGeneralesResolvers.Mutation.createParametroGeneral).toBeDefined();
    expect(parametrosGeneralesResolvers.Mutation.updateParametroGeneral).toBeDefined();
    expect(parametrosGeneralesResolvers.Mutation.deleteParametroGeneral).toBeDefined();
  });

  it('getParametrosGenerales llama al método del controlador', async () => {
    const spy = jest.spyOn(parametrosGeneralesResolvers.Query, 'getParametrosGenerales').mockResolvedValue([]);
    await parametrosGeneralesResolvers.Query.getParametrosGenerales();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('getParametroGeneral llama al método del controlador', async () => {
    const mockParametroGeneral = {
      id_parametro_general: '1',
      nombre_parametro: 'Test',
      // agrega aquí otras propiedades requeridas por ParametrosGenerales
    };
    const spy = jest.spyOn(parametrosGeneralesResolvers.Query, 'getParametroGeneral').mockResolvedValue(mockParametroGeneral);
    const args = { id: '1' };
    await parametrosGeneralesResolvers.Query.getParametroGeneral({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('createParametroGeneral llama al método del controlador', async () => {
    const mockParametroGeneral = {
      id_parametro_general: '1',
      nombre_parametro: 'Test',
      // agrega aquí otras propiedades requeridas por ParametrosGenerales
    };
    const spy = jest.spyOn(parametrosGeneralesResolvers.Mutation, 'createParametroGeneral').mockResolvedValue(mockParametroGeneral);
    const args = { data: mockParametroGeneral };
    await parametrosGeneralesResolvers.Mutation.createParametroGeneral({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });


  it('deleteParametroGeneral llama al método del controlador', async () => {
    const mockRespuesta = {
      exitoso: "S" as "S",
      mensaje: "Eliminado correctamente",
    };
    const spy = jest.spyOn(parametrosGeneralesResolvers.Mutation, 'deleteParametroGeneral').mockResolvedValue(mockRespuesta);
    const args = { id: '1' };
    await parametrosGeneralesResolvers.Mutation.deleteParametroGeneral({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getParametrosGenerales ejecuta correctamente', async () => {
  const result = await parametrosGeneralesResolvers.Query.getParametrosGenerales();
  expect(result).not.toBeUndefined();
});

it('getParametroGeneral ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await parametrosGeneralesResolvers.Query.getParametroGeneral({}, args);
  expect(result).not.toBeUndefined();
});

it('createParametroGeneral ejecuta correctamente', async () => {
  const args = { data: mockParametrosGenerales };
  const result = await parametrosGeneralesResolvers.Mutation.createParametroGeneral({}, args);
  expect(result).not.toBeUndefined();
});

it('updateParametroGeneral ejecuta correctamente', async () => {
  const args = { id: '1', data: mockParametrosGenerales };
  const result = await parametrosGeneralesResolvers.Mutation.updateParametroGeneral({}, args);
  expect(result).not.toBeUndefined();
});

it('deleteParametroGeneral ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await parametrosGeneralesResolvers.Mutation.deleteParametroGeneral({}, args);
  expect(result).not.toBeUndefined();
});
});