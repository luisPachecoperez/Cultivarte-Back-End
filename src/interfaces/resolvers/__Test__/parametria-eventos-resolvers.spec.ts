import { parametriaEventosResolvers } from '../parametria-eventos-resolvers';

describe('parametriaEventosResolvers', () => {
  it('debe definir el resolver getParametriaEventos', () => {
    expect(parametriaEventosResolvers.Query.getParametriaEventos).toBeDefined();
  });

  it('getParametriaEventos llama al método del controlador', async () => {
    // Mock del método getAll del controlador
    const mockResult = [{ id: '1', nombre: 'Evento' }];
    const spy = jest.spyOn(parametriaEventosResolvers.Query, 'getParametriaEventos').mockResolvedValue(mockResult);

    const result = await parametriaEventosResolvers.Query.getParametriaEventos();

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(mockResult);

    spy.mockRestore();
  });

  it('getParametriaEventos ejecuta correctamente', async () => {
    jest.spyOn(parametriaEventosResolvers.Query, 'getParametriaEventos').mockResolvedValue([]);
    const result = await parametriaEventosResolvers.Query.getParametriaEventos();
    expect(result).not.toBeUndefined();
  });
});