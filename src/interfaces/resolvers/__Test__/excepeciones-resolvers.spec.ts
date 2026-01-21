import { buildExcepcionesResolvers } from '../excepciones-resolvers';
import { ExcepcionesController } from '../../../aplication/controller/excepciones-controller';

const buildMockController = () => ({
  getExcepciones: jest.fn(),
  persistExcepcion: jest.fn(),
});

describe('excepcionesResolvers', () => {
  it('should resolve excepciones successfully', async () => {
    const controller = buildMockController();
    const expected = [{ id_excepcion: 1, error: 'CODE', mensaje: 'Example' }];
    controller.getExcepciones.mockResolvedValue(expected);

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Query.GetExcepciones();

    expect(controller.getExcepciones).toHaveBeenCalledTimes(1);
    expect(result).toBe(expected);
  });

  it('should map controller errors from GetExcepciones into respuesta Grap format', async () => {
    const controller = buildMockController();
    controller.getExcepciones.mockRejectedValue(new Error('boom'));

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Query.GetExcepciones();

    expect(result).toEqual({ exitoso: 'N', mensaje: 'boom' });
  });

  it('should stringify non-error values when GetExcepciones rejects', async () => {
    const controller = buildMockController();
    controller.getExcepciones.mockRejectedValue({ detalle: 'fallo' });

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Query.GetExcepciones();

    expect(result).toEqual({
      exitoso: 'N',
      mensaje: JSON.stringify({ detalle: 'fallo' }),
    });
  });

  it('should persist excepciones when mutation succeeds', async () => {
    const controller = buildMockController();
    const input = { nuevos: [], modificados: [], eliminados: [] };
    const expected = { exitoso: 'S', mensaje: 'ok' };
    controller.persistExcepcion.mockResolvedValue(expected);

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Mutation.UpdateExcepciones({}, { input });

    expect(controller.persistExcepcion).toHaveBeenCalledWith(input);
    expect(result).toBe(expected);
  });

  it('should stringify non-error mutation failures', async () => {
    const controller = buildMockController();
    const input = { nuevos: [], modificados: [], eliminados: [] };
    const failure = { error: 'invalid-data' };
    controller.persistExcepcion.mockRejectedValue(failure);

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Mutation.UpdateExcepciones({}, { input });

    expect(result).toEqual({
      exitoso: 'N',
      mensaje: JSON.stringify(failure),
    });
  });

  it('should bubble error message when mutation throws Error instance', async () => {
    const controller = buildMockController();
    const input = { nuevos: [], modificados: [], eliminados: [] };
    controller.persistExcepcion.mockRejectedValue(new Error('mutation failed'));

    const resolvers = buildExcepcionesResolvers(
      controller as unknown as ExcepcionesController,
    );

    const result = await resolvers.Mutation.UpdateExcepciones({}, { input });

    expect(result).toEqual({ exitoso: 'N', mensaje: 'mutation failed' });
  });
});
