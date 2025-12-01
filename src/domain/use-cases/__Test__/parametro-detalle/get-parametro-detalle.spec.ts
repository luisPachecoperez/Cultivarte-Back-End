import { GetParametroDetalleUseCaseImpl } from '../../parametro-detalle/get-parametro-detalle';
import {
  ParametroDetalle,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../../../';

describe('GetParametroDetalleUseCaseImpl', () => {
  const parametroDetalleRepository: ParametroDetalleRepository = {
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  } as any;

  const useCase = new GetParametroDetalleUseCaseImpl(
    parametroDetalleRepository,
  );

  const mockParametroDetalle: ParametroDetalle = {
    id_parametro_detalle: '1',
    nombre: 'Test',
  } as any;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'Error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna ParametroDetalle correctamente', async () => {
    (parametroDetalleRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockParametroDetalle,
    );
    const result = await useCase.execute('1');
    expect(parametroDetalleRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(mockParametroDetalle);
  });

  it('retorna respuesta de error', async () => {
    (parametroDetalleRepository.getById as jest.Mock).mockResolvedValueOnce(
      mockRespuesta,
    );
    const result = await useCase.execute('2');
    expect(result).toBe(mockRespuesta);
  });

  it('propaga errores si ocurren', async () => {
    (parametroDetalleRepository.getById as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    );
    await expect(useCase.execute('3')).rejects.toThrow('DB error');
  });
});
