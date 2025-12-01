import { ParametriaEventosController } from '../parametria-eventos-controller';
import { GetParametriaEventosUseCase } from '../../../domain';

describe('ParametriaEventosController', () => {
  const getParametriaEventosUseCase = { execute: jest.fn() };
  const controller = new ParametriaEventosController(
    getParametriaEventosUseCase as GetParametriaEventosUseCase,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAll - success', async () => {
    const mockResult = [{ id: 1, nombre: 'Evento' }];
    getParametriaEventosUseCase.execute.mockResolvedValueOnce(mockResult);
    await expect(controller.getAll()).resolves.toEqual(mockResult);
    expect(getParametriaEventosUseCase.execute).toHaveBeenCalled();
  });

  it('getAll - error', async () => {
    const mockError = { error: true, mensaje: 'error' };
    getParametriaEventosUseCase.execute.mockResolvedValueOnce(mockError);
    await expect(controller.getAll()).resolves.toBe(mockError);
  });
});
