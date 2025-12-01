"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametros_generales_controller_1 = require("../parametros-generales-controller");
describe('ParametrosGeneralesController', () => {
    const createParametroGeneralUseCase = { execute: jest.fn() };
    const getParametrosGeneralesUseCase = { execute: jest.fn() };
    const getParametroGeneralUseCase = { execute: jest.fn() };
    const updateParametroGeneralUseCase = { execute: jest.fn() };
    const deleteParametroGeneralUseCase = { execute: jest.fn() };
    const controller = new parametros_generales_controller_1.ParametrosGeneralesController(createParametroGeneralUseCase, getParametrosGeneralesUseCase, getParametroGeneralUseCase, updateParametroGeneralUseCase, deleteParametroGeneralUseCase);
    const mockParametroGeneral = {
        id_parametro_general: '1',
        valor: 'test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('createParametroGeneral - success', async () => {
        createParametroGeneralUseCase.execute.mockResolvedValueOnce(mockParametroGeneral);
        await expect(controller.createParametroGeneral(mockParametroGeneral)).resolves.toBe(mockParametroGeneral);
        expect(createParametroGeneralUseCase.execute).toHaveBeenCalledWith(mockParametroGeneral);
    });
    it('createParametroGeneral - error', async () => {
        createParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.createParametroGeneral(mockParametroGeneral)).resolves.toBe(mockRespuesta);
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
        await expect(controller.getParametrosGenerales()).resolves.toBe(mockRespuesta);
    });
    it('getParametroGeneral - success', async () => {
        getParametroGeneralUseCase.execute.mockResolvedValueOnce(mockParametroGeneral);
        await expect(controller.getParametroGeneral('1')).resolves.toBe(mockParametroGeneral);
        expect(getParametroGeneralUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getParametroGeneral - error', async () => {
        getParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getParametroGeneral('1')).resolves.toBe(mockRespuesta);
    });
    it('updateParametroGeneral - success', async () => {
        updateParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateParametroGeneral('1', mockParametroGeneral)).resolves.toBe(mockRespuesta);
        expect(updateParametroGeneralUseCase.execute).toHaveBeenCalledWith('1', mockParametroGeneral);
    });
    it('deleteParametroGeneral - success', async () => {
        deleteParametroGeneralUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.deleteParametroGeneral('1')).resolves.toBe(mockRespuesta);
        expect(deleteParametroGeneralUseCase.execute).toHaveBeenCalledWith('1');
    });
});
//# sourceMappingURL=parametros-generales-controller.spec.js.map