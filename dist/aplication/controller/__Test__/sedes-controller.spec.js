"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sedes_controller_1 = require("../sedes-controller");
describe('SedesController', () => {
    const getSedesUseCase = { execute: jest.fn() };
    const getSedeUseCase = { execute: jest.fn() };
    const createSedeUseCase = { execute: jest.fn() };
    const updateSedeUseCase = { execute: jest.fn() };
    const deleteSedeUseCase = { execute: jest.fn() };
    const controller = new sedes_controller_1.SedesController(getSedesUseCase, getSedeUseCase, createSedeUseCase, updateSedeUseCase, deleteSedeUseCase);
    const mockSede = { id: '1', nombre: 'TestSede' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAll - success', async () => {
        getSedesUseCase.execute.mockResolvedValueOnce([mockSede]);
        await expect(controller.getAll()).resolves.toEqual([mockSede]);
        expect(getSedesUseCase.execute).toHaveBeenCalled();
    });
    it('getAll - error', async () => {
        getSedesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getAll()).resolves.toBe(mockRespuesta);
    });
    it('getById - success', async () => {
        getSedeUseCase.execute.mockResolvedValueOnce(mockSede);
        await expect(controller.getById('1')).resolves.toBe(mockSede);
        expect(getSedeUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getById - error', async () => {
        getSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getById('1')).resolves.toBe(mockRespuesta);
    });
    it('create - success', async () => {
        createSedeUseCase.execute.mockResolvedValueOnce(mockSede);
        await expect(controller.create(mockSede)).resolves.toBe(mockSede);
        expect(createSedeUseCase.execute).toHaveBeenCalledWith(mockSede);
    });
    it('create - error', async () => {
        createSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.create(mockSede)).resolves.toBe(mockRespuesta);
    });
    it('update - success', async () => {
        updateSedeUseCase.execute.mockResolvedValueOnce(mockSede);
        await expect(controller.update('1', mockSede)).resolves.toBe(mockSede);
        expect(updateSedeUseCase.execute).toHaveBeenCalledWith('1', mockSede);
    });
    it('update - error', async () => {
        updateSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.update('1', mockSede)).resolves.toBe(mockRespuesta);
    });
    it('delete - success', async () => {
        deleteSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.delete('1')).resolves.toBe(mockRespuesta);
        expect(deleteSedeUseCase.execute).toHaveBeenCalledWith('1');
    });
});
//# sourceMappingURL=sedes-controller.spec.js.map