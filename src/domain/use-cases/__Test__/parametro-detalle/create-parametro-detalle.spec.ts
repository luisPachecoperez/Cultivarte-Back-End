describe('CreateParametroDetalleUseCaseImpl', () => {
  const parametroDetalleMock = { id: 1, nombre: 'Test' } as any;
  const respuestaGrapMock = { error: true, mensaje: 'Error' } as any;

  let parametroDetalleRepository: { create: jest.Mock };
  let useCase: import('../../parametro-detalle/create-parametro-detalle').CreateParametroDetalleUseCaseImpl;

  beforeEach(() => {
    parametroDetalleRepository = {
      create: jest.fn(),
    };
    useCase =
      new (require('../../parametro-detalle/create-parametro-detalle').CreateParametroDetalleUseCaseImpl)(
        parametroDetalleRepository,
      );
  });

  it('should call repository.create with the correct parametroDetalle', async () => {
    parametroDetalleRepository.create.mockResolvedValue(parametroDetalleMock);
    await useCase.execute(parametroDetalleMock);
    expect(parametroDetalleRepository.create).toHaveBeenCalledWith(
      parametroDetalleMock,
    );
  });

  it('should return the created ParametroDetalle', async () => {
    parametroDetalleRepository.create.mockResolvedValue(parametroDetalleMock);
    const result = await useCase.execute(parametroDetalleMock);
    expect(result).toBe(parametroDetalleMock);
  });

  it('should return RespuestaGrap if repository.create returns it', async () => {
    parametroDetalleRepository.create.mockResolvedValue(respuestaGrapMock);
    const result = await useCase.execute(parametroDetalleMock);
    expect(result).toBe(respuestaGrapMock);
  });

  it('should propagate errors thrown by repository.create', async () => {
    const error = new Error('DB error');
    parametroDetalleRepository.create.mockRejectedValue(error);
    await expect(useCase.execute(parametroDetalleMock)).rejects.toThrow(error);
  });
});
