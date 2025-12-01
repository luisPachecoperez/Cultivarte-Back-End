import { ParametrosGeneralesController } from '../parametros-generales-controller';
import {
  ParametrosGenerales,
  CreateParametroGeneralUseCase,
  DeleteParametroGeneralUseCase,
  GetParametroGeneralUseCase,
  GetParametrosGeneralesUseCase,
  UpdateParametroGeneralUseCase,
  RespuestaGrap,
} from '../../../domain';

describe('ParametrosGeneralesController', () => {
  const createParametroGeneralUseCase = { execute: jest.fn() };
  const getParametrosGeneralesUseCase = { execute: jest.fn() };
  const getParametroGeneralUseCase = { execute: jest.fn() };
  const updateParametroGeneralUseCase = { execute: jest.fn() };
  const deleteParametroGeneralUseCase = { execute: jest.fn() };

  const controller = new ParametrosGeneralesController(
    createParametroGeneralUseCase as CreateParametroGeneralUseCase,
    getParametrosGeneralesUseCase as GetParametrosGeneralesUseCase,
    getParametroGeneralUseCase as GetParametroGeneralUseCase,
    updateParametroGeneralUseCase as UpdateParametroGeneralUseCase,
    deleteParametroGeneralUseCase as DeleteParametroGeneralUseCase,
  );

  const mockParametroGeneral: ParametrosGenerales = {
    id_parametro_general: '1',
    valor: 'test',
  } as ParametrosGenerales;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createParametroGeneral - success', async () => {
    createParametroGeneralUseCase.execute.mockResolvedValueOnce(
      mockParametroGeneral,
    );
    await expect(
      controller.createParametroGeneral(mockParametroGeneral),
    ).resolves.toBe(mockParametroGeneral);
    expect(createParametroGeneralUseCase.execute).toHaveBeenCalledWith(
      mockParametroGeneral,
    );
  });

  it('createParametroGeneral - error', async () => {
    createParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(
      controller.createParametroGeneral(mockParametroGeneral),
    ).resolves.toBe(mockRespuesta);
  });

  it('getParametrosGenerales - success', async () => {
    getParametrosGeneralesUseCase.execute.mockResolvedValueOnce([
      mockParametroGeneral,
    ]);
    await expect(controller.getParametrosGenerales()).resolves.toEqual([
      mockParametroGeneral,
    ]);
    expect(getParametrosGeneralesUseCase.execute).toHaveBeenCalled();
  });

  it('getParametrosGenerales - error', async () => {
    getParametrosGeneralesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getParametrosGenerales()).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getParametroGeneral - success', async () => {
    getParametroGeneralUseCase.execute.mockResolvedValueOnce(
      mockParametroGeneral,
    );
    await expect(controller.getParametroGeneral('1')).resolves.toBe(
      mockParametroGeneral,
    );
    expect(getParametroGeneralUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getParametroGeneral - error', async () => {
    getParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getParametroGeneral('1')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('updateParametroGeneral - success', async () => {
    updateParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(
      controller.updateParametroGeneral('1', mockParametroGeneral),
    ).resolves.toBe(mockRespuesta);
    expect(updateParametroGeneralUseCase.execute).toHaveBeenCalledWith(
      '1',
      mockParametroGeneral,
    );
  });

  it('deleteParametroGeneral - success', async () => {
    deleteParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.deleteParametroGeneral('1')).resolves.toBe(
      mockRespuesta,
    );
    expect(deleteParametroGeneralUseCase.execute).toHaveBeenCalledWith('1');
  });
});
