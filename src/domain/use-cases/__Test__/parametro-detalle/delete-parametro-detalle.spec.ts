import { DeleteParametroDetalleUseCaseImpl } from '../../parametro-detalle/delete-paramtero-detalle';

describe('DeleteParametroDetalleUseCaseImpl', () => {
  const respuestaGrapMock = { error: false, mensaje: 'Eliminado' } as any;
  let parametroDetalleRepository: {
    getAll: jest.Mock;
    getById: jest.Mock;
    create: jest.Mock;
    updateById: jest.Mock;
    deleteById: jest.Mock;
  };
  let useCase: DeleteParametroDetalleUseCaseImpl;

  beforeEach(() => {
    parametroDetalleRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    useCase = new DeleteParametroDetalleUseCaseImpl(parametroDetalleRepository);
  });

  it('should call repository.deleteById with the correct id', async () => {
    parametroDetalleRepository.deleteById.mockResolvedValue(respuestaGrapMock);
    await useCase.execute('123');
    expect(parametroDetalleRepository.deleteById).toHaveBeenCalledWith('123');
  });

  it('should return RespuestaGrap from repository.deleteById', async () => {
    parametroDetalleRepository.deleteById.mockResolvedValue(respuestaGrapMock);
    const result = await useCase.execute('456');
    expect(result).toBe(respuestaGrapMock);
  });

  it('should propagate errors thrown by repository.deleteById', async () => {
    const error = new Error('DB error');
    parametroDetalleRepository.deleteById.mockRejectedValue(error);
    await expect(useCase.execute('789')).rejects.toThrow(error);
  });
});
