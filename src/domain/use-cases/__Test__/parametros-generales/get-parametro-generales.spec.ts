import { GetParametrosGeneralesUseCaseImpl } from '../../parametros-generales/get-parametros-generales';
import {
  ParametrosGeneralesRepository,
  ParametrosGenerales,
  RespuestaGrap,
} from '../../..';

describe('GetParametrosGeneralesUseCaseImpl', () => {
  const repository: ParametrosGeneralesRepository = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  const useCase = new GetParametrosGeneralesUseCaseImpl(repository);

  const mockParametros: ParametrosGenerales[] = [
    { id_parametro_general: '1', nombre: 'General Test' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ParametrosGenerales[] correctamente', async () => {
    (repository.getAll as jest.Mock).mockResolvedValueOnce(mockParametros);
    const result = await useCase.execute();
    expect(repository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockParametros);
  });

  it('retorna respuesta de error', async () => {
    (repository.getAll as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (repository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
