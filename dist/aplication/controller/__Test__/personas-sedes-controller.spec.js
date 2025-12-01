"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_sedes_controller_1 = require("../personas-sedes-controller");
describe('PersonasSedesController', () => {
    const getPersonaSedeUseCase = { execute: jest.fn() };
    const getPersonasSedesUseCase = { execute: jest.fn() };
    const createPersonaSedeUseCase = { execute: jest.fn() };
    const updatePersonaSedeUseCase = { execute: jest.fn() };
    const deletePersonaSedeUseCase = { execute: jest.fn() };
    const controller = new personas_sedes_controller_1.PersonasSedesController(getPersonaSedeUseCase, getPersonasSedesUseCase, createPersonaSedeUseCase, updatePersonaSedeUseCase, deletePersonaSedeUseCase);
    const mockPersonasSede = {
        id_personas_sede: '1',
        id_persona: 'persona1',
        id_sede: 'sede1',
        id_creado_por: 'user1',
        fecha_creacion: new Date().toISOString(),
        id_modificado_por: 'user2',
        fecha_modificacion: new Date().toISOString(),
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAll - success', async () => {
        getPersonasSedesUseCase.execute.mockResolvedValueOnce([mockPersonasSede]);
        await expect(controller.getAll()).resolves.toEqual([mockPersonasSede]);
        expect(getPersonasSedesUseCase.execute).toHaveBeenCalled();
    });
    it('getAll - error', async () => {
        getPersonasSedesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getAll()).resolves.toBe(mockRespuesta);
    });
    it('getById - success', async () => {
        getPersonaSedeUseCase.execute.mockResolvedValueOnce(mockPersonasSede);
        await expect(controller.getById('1')).resolves.toBe(mockPersonasSede);
        expect(getPersonaSedeUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getById - error', async () => {
        getPersonaSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getById('1')).resolves.toBe(mockRespuesta);
    });
    it('create - success', async () => {
        createPersonaSedeUseCase.execute.mockResolvedValueOnce(mockPersonasSede);
        await expect(controller.create(mockPersonasSede)).resolves.toBe(mockPersonasSede);
        expect(createPersonaSedeUseCase.execute).toHaveBeenCalledWith(mockPersonasSede);
    });
    it('create - error', async () => {
        createPersonaSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.create(mockPersonasSede)).resolves.toBe(mockRespuesta);
    });
    it('update - success', async () => {
        updatePersonaSedeUseCase.execute.mockResolvedValueOnce(mockPersonasSede);
        await expect(controller.update('1', mockPersonasSede)).resolves.toBe(mockPersonasSede);
        expect(updatePersonaSedeUseCase.execute).toHaveBeenCalledWith('1', mockPersonasSede);
    });
    it('update - error', async () => {
        updatePersonaSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.update('1', mockPersonasSede)).resolves.toBe(mockRespuesta);
    });
    it('delete - success', async () => {
        deletePersonaSedeUseCase.execute.mockResolvedValueOnce(mockPersonasSede);
        await expect(controller.delete('1')).resolves.toBe(mockPersonasSede);
        expect(deletePersonaSedeUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('delete - error', async () => {
        deletePersonaSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.delete('1')).resolves.toBe(mockRespuesta);
    });
});
//# sourceMappingURL=personas-sedes-controller.spec.js.map