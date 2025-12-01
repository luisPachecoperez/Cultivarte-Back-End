"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametros_detalle_controller_1 = require("../parametros-detalle-controller");
describe('ParametrosDetalleController', () => {
    const createParametroDetalleUseCase = { execute: jest.fn() };
    const getParametrosDetalleUseCase = { execute: jest.fn() };
    const getParametroDetalleUseCase = { execute: jest.fn() };
    const updateParametroDetalleUseCase = { execute: jest.fn() };
    const deleteParametroDetalleUseCase = { execute: jest.fn() };
    const controller = new parametros_detalle_controller_1.ParametrosDetalleController(createParametroDetalleUseCase, getParametrosDetalleUseCase, getParametroDetalleUseCase, updateParametroDetalleUseCase, deleteParametroDetalleUseCase);
    const mockParametroDetalle = {
        id: '1',
        valor: 'test',
        id_parametro_detalle: '1',
        id_parametro_general: '1',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('createParametroDetalle - success', async () => {
        createParametroDetalleUseCase.execute.mockResolvedValueOnce(mockParametroDetalle);
        await expect(controller.createParametroDetalle(mockParametroDetalle)).resolves.toBe(mockParametroDetalle);
        expect(createParametroDetalleUseCase.execute).toHaveBeenCalledWith(mockParametroDetalle);
    });
    it('createParametroDetalle - error', async () => {
        createParametroDetalleUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.createParametroDetalle(mockParametroDetalle)).resolves.toBe(mockRespuesta);
    });
    it('getParametrosDetalle - success', async () => {
        getParametrosDetalleUseCase.execute.mockResolvedValueOnce([
            mockParametroDetalle,
        ]);
        await expect(controller.getParametrosDetalle()).resolves.toEqual([
            mockParametroDetalle,
        ]);
        expect(getParametrosDetalleUseCase.execute).toHaveBeenCalled();
    });
    it('getParametrosDetalle - error', async () => {
        getParametrosDetalleUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getParametrosDetalle()).resolves.toBe(mockRespuesta);
    });
    it('getParametroDetalle - success', async () => {
        getParametroDetalleUseCase.execute.mockResolvedValueOnce(mockParametroDetalle);
        await expect(controller.getParametroDetalle('1')).resolves.toBe(mockParametroDetalle);
        expect(getParametroDetalleUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getParametroDetalle - error', async () => {
        getParametroDetalleUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getParametroDetalle('1')).resolves.toBe(mockRespuesta);
    });
    it('updateParametroDetalle - success', async () => {
        updateParametroDetalleUseCase.execute.mockResolvedValueOnce(mockParametroDetalle);
        await expect(controller.updateParametroDetalle('1', mockParametroDetalle)).resolves.toBe(mockParametroDetalle);
        expect(updateParametroDetalleUseCase.execute).toHaveBeenCalledWith('1', mockParametroDetalle);
    });
    it('updateParametroDetalle - error', async () => {
        updateParametroDetalleUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateParametroDetalle('1', mockParametroDetalle)).resolves.toBe(mockRespuesta);
    });
    it('deleteParametroDetalle - success', async () => {
        deleteParametroDetalleUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.deleteParametroDetalle('1')).resolves.toBe(mockRespuesta);
        expect(deleteParametroDetalleUseCase.execute).toHaveBeenCalledWith('1');
    });
});
//# sourceMappingURL=parametros-detalle-controller.spec.js.map