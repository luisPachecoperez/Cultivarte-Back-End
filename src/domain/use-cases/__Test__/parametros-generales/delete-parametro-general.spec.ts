import { DeleteParametroGeneralUseCaseImpl } from '../../parametros-generales/delete-parametro-general';
import { ParametrosGeneralesRepository, RespuestaGrap } from '../../../';

describe('DeleteParametroGeneralUseCaseImpl', () => {
  const repository: ParametrosGeneralesRepository = {
    deleteById: jest.fn(),
  } as any;

  const useCase = new DeleteParametroGeneralUseCaseImpl(repository);

  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Eliminado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe llamar deleteById con el id correcto', async () => {
    (repository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1');
    expect(repository.deleteById).toHaveBeenCalledWith('1');
  });

  it('debe retornar la respuesta del repositorio', async () => {
    (repository.deleteById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (repository.deleteById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
