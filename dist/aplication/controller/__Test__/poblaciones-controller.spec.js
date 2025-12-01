"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poblaciones_controller_1 = require("../poblaciones-controller");
describe('PoblacionesController', () => {
    const getPoblacionesUseCase = { execute: jest.fn() };
    const getPoblacionUseCase = { execute: jest.fn() };
    const createPoblacionUseCase = { execute: jest.fn() };
    const updatePoblacionUseCase = { execute: jest.fn() };
    const deletePoblacionUseCase = { execute: jest.fn() };
    const controller = new poblaciones_controller_1.PoblacionesController(getPoblacionesUseCase, getPoblacionUseCase, createPoblacionUseCase, updatePoblacionUseCase, deletePoblacionUseCase);
    const mockPoblacion = { id_poblacion: '1', nombre: 'Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    const mockErrorResult = {
        mensaje: 'error',
        exitoso: 'N',
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getPoblaciones - success', async () => {
        getPoblacionesUseCase.execute.mockResolvedValueOnce([mockPoblacion]);
        await expect(controller.getPoblaciones()).resolves.toEqual([mockPoblacion]);
        expect(getPoblacionesUseCase.execute).toHaveBeenCalled();
    });
    it('getPoblaciones - error', async () => {
        getPoblacionesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getPoblaciones()).resolves.toBe(mockRespuesta);
    });
    it('getPoblacion - success', async () => {
        getPoblacionUseCase.execute.mockResolvedValueOnce(mockPoblacion);
        await expect(controller.getPoblacion('1')).resolves.toBe(mockPoblacion);
        expect(getPoblacionUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getPoblacion - error branch exitoso=N', async () => {
        getPoblacionUseCase.execute.mockResolvedValueOnce(mockErrorResult);
        await expect(controller.getPoblacion('1')).resolves.toBe(mockErrorResult);
        expect(getPoblacionUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('createPoblacion - success', async () => {
        createPoblacionUseCase.execute.mockResolvedValueOnce(mockPoblacion);
        await expect(controller.createPoblacion(mockPoblacion)).resolves.toBe(mockPoblacion);
        expect(createPoblacionUseCase.execute).toHaveBeenCalledWith(mockPoblacion);
    });
    it('createPoblacion - error', async () => {
        createPoblacionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.createPoblacion(mockPoblacion)).resolves.toBe(mockRespuesta);
    });
    it('updatePoblacion - success', async () => {
        updatePoblacionUseCase.execute.mockResolvedValueOnce(mockPoblacion);
        await expect(controller.updatePoblacion('1', mockPoblacion)).resolves.toBe(mockPoblacion);
        expect(updatePoblacionUseCase.execute).toHaveBeenCalledWith('1', mockPoblacion);
    });
    it('updatePoblacion - error', async () => {
        updatePoblacionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updatePoblacion('1', mockPoblacion)).resolves.toBe(mockRespuesta);
    });
    it('deletePoblacion - success', async () => {
        deletePoblacionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.deletePoblacion('1')).resolves.toBe(mockRespuesta);
        expect(deletePoblacionUseCase.execute).toHaveBeenCalledWith('1');
    });
});
//# sourceMappingURL=poblaciones-controller.spec.js.map