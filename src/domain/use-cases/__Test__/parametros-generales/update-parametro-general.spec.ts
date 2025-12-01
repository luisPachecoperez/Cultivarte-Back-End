import { UpdateParametroGeneralUseCaseImpl } from '../../parametros-generales/update-parametro-general';
import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from '../../../';

describe('UpdateParametroGeneralUseCaseImpl', () => {
  const repository: ParametrosGeneralesRepository = {
    updateById: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  const useCase = new UpdateParametroGeneralUseCaseImpl(repository);

  const mockData: ParametrosGenerales = {
    id_parametro_general: '1',
    nombre: 'General Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'S', mensaje: 'Actualizado' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama updateById con los argumentos correctos', async () => {
    (repository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    await useCase.execute('1', mockData);
    expect(repository.updateById).toHaveBeenCalledWith('1', mockData);
  });

  it('retorna la respuesta del repositorio', async () => {
    (repository.updateById as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute('2', mockData);
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (repository.updateById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3', mockData)).rejects.toThrow('DB error');
  });
});
