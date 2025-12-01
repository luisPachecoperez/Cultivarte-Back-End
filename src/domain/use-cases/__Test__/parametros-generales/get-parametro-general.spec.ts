import { GetParametroGeneralUseCaseImpl } from '../../parametros-generales/get-parametro-general';
import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from '../../../';

describe('GetParametroGeneralUseCaseImpl', () => {
  const repository: ParametrosGeneralesRepository = {
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  const useCase = new GetParametroGeneralUseCaseImpl(repository);

  const mockParametroGeneral: ParametrosGenerales = {
    id_parametro_general: '1',
    nombre: 'General Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ParametrosGenerales correctamente', async () => {
    (repository.getById as jest.Mock).mockResolvedValueOnce(
      mockParametroGeneral,
    );
    const result = await useCase.execute('1');
    expect(repository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockParametroGeneral);
  });

  it('retorna respuesta de error', async () => {
    (repository.getById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (repository.getById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
