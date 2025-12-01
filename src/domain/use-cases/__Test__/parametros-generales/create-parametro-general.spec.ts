import { CreateParametroGeneralUseCaseImpl } from '../../parametros-generales/create-parametro-general';
import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  RespuestaGrap,
} from '../../../';

describe('CreateParametroGeneralUseCaseImpl', () => {
  // Corrige la firma del mock
  const repository: ParametrosGeneralesRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  const useCase = new CreateParametroGeneralUseCaseImpl(repository);

  const mockParametrosGenerales: ParametrosGenerales = {
    id_parametro_general: '1',
    nombre: 'General Test',
    // agrega aquí los campos necesarios según tu entidad
  } as any;

  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ParametrosGenerales correctamente', async () => {
    (repository.create as jest.Mock).mockResolvedValueOnce(
      mockParametrosGenerales,
    );
    const result = await useCase.execute(mockParametrosGenerales);
    expect(repository.create).toHaveBeenCalledWith(mockParametrosGenerales);
    expect(result).toBe(mockParametrosGenerales);
  });

  it('retorna respuesta de error', async () => {
    (repository.create as jest.Mock).mockResolvedValueOnce(mockRespuesta);
    const result = await useCase.execute(mockParametrosGenerales);
    expect(result).toBe(mockRespuesta);
  });
});
