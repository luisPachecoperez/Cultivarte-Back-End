import { DeleteParametroDetalleUseCaseImpl } from '../delete-paramtero-detalle';

describe('DeleteParametroDetalleUseCaseImpl', () => {
  let repo: any;
  let useCase: DeleteParametroDetalleUseCaseImpl;

  beforeEach(() => {
    repo = { deleteById: jest.fn() };
    useCase = new DeleteParametroDetalleUseCaseImpl(repo);
  });

  it('should return success from repository', async () => {
    const respuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    repo.deleteById.mockResolvedValue(respuesta);
    const result = await useCase.execute('1');
    expect(result).toEqual(respuesta);
  });

  it('should return error from repository', async () => {
    const error = { exitoso: 'N', mensaje: 'Error' };
    repo.deleteById.mockResolvedValue(error);
    const result = await useCase.execute('1');
    expect(result).toEqual(error);
  });
});
