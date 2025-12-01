import { GetParametrosDetalleUseCaseImpl } from '../get-parametros-detalle';

describe('GetParametrosDetalleUseCaseImpl', () => {
  let repo: any;
  let useCase: GetParametrosDetalleUseCaseImpl;

  beforeEach(() => {
    repo = { getAll: jest.fn() };
    useCase = new GetParametrosDetalleUseCaseImpl(repo);
  });

  it('should return result from repository', async () => {
    repo.getAll.mockResolvedValue(['detalle1', 'detalle2']);
    const result = await useCase.execute();
    expect(result).toEqual(['detalle1', 'detalle2']);
  });

  it('should return error from repository', async () => {
    const error = { exitoso: 'N', mensaje: 'Error' };
    repo.getAll.mockResolvedValue(error);
    const result = await useCase.execute();
    expect(result).toEqual(error);
  });
});
