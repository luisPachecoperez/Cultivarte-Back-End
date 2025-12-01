import { parametroDetalleResolvers } from '../parametro-detalle-resolvers';



describe('parametroDetalleResolvers', () => {

  const mockParametroDetalle = {
      id_parametro_detalle: '1',
      id_parametro_general: '2',
      // agrega aquí otras propiedades requeridas por ParametroDetalle
    };
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(parametroDetalleResolvers.Query.getParametrosDetalle).toBeDefined();
    expect(parametroDetalleResolvers.Query.getParametroDetalle).toBeDefined();
    expect(parametroDetalleResolvers.Mutation.createParametroDetalle).toBeDefined();
    expect(parametroDetalleResolvers.Mutation.updateParametroDetalle).toBeDefined();
    expect(parametroDetalleResolvers.Mutation.deleteParametroDetalle).toBeDefined();
  });

  it('getParametrosDetalle llama al método del controlador', async () => {
    const spy = jest.spyOn(parametroDetalleResolvers.Query, 'getParametrosDetalle').mockResolvedValue([]);
    await parametroDetalleResolvers.Query.getParametrosDetalle();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('getParametroDetalle llama al método del controlador', async () => {
    const mockParametroDetalle = {
      id_parametro_detalle: '1',
      id_parametro_general: '2',
      // agrega aquí otras propiedades requeridas por ParametroDetalle
    };
    const spy = jest.spyOn(parametroDetalleResolvers.Query, 'getParametroDetalle').mockResolvedValue(mockParametroDetalle);
    const args = { id: '1' };
    await parametroDetalleResolvers.Query.getParametroDetalle({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('createParametroDetalle llama al método del controlador', async () => {
const mockParametroDetalle = {
  id_parametro_detalle: '1',
  id_parametro_general: '2',
  // agrega aquí otras propiedades requeridas por ParametroDetalle
};
const spy = jest.spyOn(parametroDetalleResolvers.Mutation, 'createParametroDetalle').mockResolvedValue(mockParametroDetalle);
const args = {
  data: mockParametroDetalle
};
await parametroDetalleResolvers.Mutation.createParametroDetalle({}, args);
expect(spy).toHaveBeenCalledWith({}, args);
spy.mockRestore();
  });

  it('updateParametroDetalle llama al método del controlador', async () => {
const mockParametroDetalle = {
  id_parametro_detalle: '1',
  id_parametro_general: '2',
  // agrega aquí otras propiedades requeridas por ParametroDetalle
};
    const spy = jest.spyOn(parametroDetalleResolvers.Mutation, 'updateParametroDetalle').mockResolvedValue({
      id_parametro_detalle: '1',
      id_parametro_general: '2',
      // agrega aquí otras propiedades requeridas por ParametroDetalle
    });
    const args = {
      id: '1',
      data: {
        id_parametro_detalle: '1',
        id_parametro_general: '2',
        // agrega aquí otras propiedades requeridas por ParametroDetalle
      }
    };
    await parametroDetalleResolvers.Mutation.updateParametroDetalle({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });
it('getParametrosDetalle ejecuta correctamente', async () => {
  jest.spyOn(parametroDetalleResolvers.Query, 'getParametrosDetalle').mockResolvedValue([]);
  const result = await parametroDetalleResolvers.Query.getParametrosDetalle();
  expect(result).not.toBeUndefined();
});

it('getParametroDetalle ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await parametroDetalleResolvers.Query.getParametroDetalle({}, args);
  expect(result).not.toBeUndefined();
});

it('createParametroDetalle ejecuta correctamente', async () => {
  const args = { data: mockParametroDetalle };
  const result = await parametroDetalleResolvers.Mutation.createParametroDetalle({}, args);
  expect(result).not.toBeUndefined();
});

it('updateParametroDetalle ejecuta correctamente', async () => {
  const args = { id: '1', data: mockParametroDetalle };
  const result = await parametroDetalleResolvers.Mutation.updateParametroDetalle({}, args);
  expect(result).not.toBeUndefined();
});

it('deleteParametroDetalle ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await parametroDetalleResolvers.Mutation.deleteParametroDetalle({}, args);
  expect(result).not.toBeUndefined();
});
});