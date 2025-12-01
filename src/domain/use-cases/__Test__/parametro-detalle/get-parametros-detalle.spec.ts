import { GetParametrosDetalleUseCaseImpl } from '../../parametro-detalle/get-parametros-detalle';
import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../../../';

describe('GetParametrosDetalleUseCaseImpl', () => {
  const parametroDetalleRepository: ParametroDetalleRepository = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  const useCase = new GetParametrosDetalleUseCaseImpl(
    parametroDetalleRepository,
  );

  const mockDetalles: ParametroDetalle[] = [
    { id_parametro_detalle: '1', nombre: 'Detalle 1' } as any,
    { id_parametro_detalle: '2', nombre: 'Detalle 2' } as any,
  ];
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna array de ParametroDetalle correctamente', async () => {
    (parametroDetalleRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockDetalles,
    );
    const result = await useCase.execute();
    expect(parametroDetalleRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockDetalles);
  });

  it('retorna respuesta de error', async () => {
    (parametroDetalleRepository.getAll as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute();
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (parametroDetalleRepository.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });
});
