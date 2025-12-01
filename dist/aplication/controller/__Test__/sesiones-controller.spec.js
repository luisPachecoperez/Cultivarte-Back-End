"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sesiones_controller_1 = require("../sesiones-controller");
describe('SesionesController', () => {
    const getSesionesUseCase = { execute: jest.fn() };
    const getSesionUseCase = { execute: jest.fn() };
    const getSesionesSedesUseCase = { execute: jest.fn() };
    const createSesionUseCase = { execute: jest.fn() };
    const updateSesionUseCase = { execute: jest.fn() };
    const deleteSesionUseCase = { execute: jest.fn() };
    const updateSesionesUseCase = { execute: jest.fn() };
    const controller = new sesiones_controller_1.SesionesController(getSesionesUseCase, getSesionUseCase, getSesionesSedesUseCase, createSesionUseCase, updateSesionUseCase, deleteSesionUseCase, updateSesionesUseCase);
    const mockSesion = {
        id_sesion: '1',
        id_actividad: '1',
        fecha_actividad: '2024-01-01',
        hora_inicio: '09:00',
        hora_fin: '10:00',
        descripcion: 'Mock descripcion',
        imagen: 'mock-imagen.jpg',
        nro_asistentes: 10,
        id_creado_por: 'user1',
        fecha_creacion: '2024-01-01T08:00:00Z',
        id_modificado_por: 'user2',
        fecha_modificacion: '2024-01-02T08:00:00Z',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    const mockEditarSesiones = {
        sesiones: {
            nuevos: [],
            modificados: [],
            eliminados: [],
        },
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getSesiones - success', async () => {
        getSesionesUseCase.execute.mockResolvedValueOnce([mockSesion]);
        await expect(controller.getSesiones(10, 0)).resolves.toEqual([mockSesion]);
        expect(getSesionesUseCase.execute).toHaveBeenCalledWith(10, 0);
    });
    it('getSesiones - error', async () => {
        getSesionesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getSesiones(10, 0)).resolves.toBe(mockRespuesta);
    });
    it('getSesion - success', async () => {
        getSesionUseCase.execute.mockResolvedValueOnce(mockSesion);
        await expect(controller.getSesion('1')).resolves.toBe(mockSesion);
        expect(getSesionUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getSesion - error', async () => {
        getSesionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getSesion('1')).resolves.toBe(mockRespuesta);
    });
    it('getSesionesSedes - success', async () => {
        getSesionesSedesUseCase.execute.mockResolvedValueOnce([mockSesion]);
        await expect(controller.getSesionesSedes('user', '2024-01-01', '2024-01-31')).resolves.toEqual([mockSesion]);
        expect(getSesionesSedesUseCase.execute).toHaveBeenCalledWith('user', '2024-01-01', '2024-01-31');
    });
    it('getSesionesSedes - error', async () => {
        getSesionesSedesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getSesionesSedes('user', '2024-01-01', '2024-01-31')).resolves.toBe(mockRespuesta);
    });
    it('createSesion - success', async () => {
        createSesionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.createSesion(mockSesion)).resolves.toBe(mockRespuesta);
        expect(createSesionUseCase.execute).toHaveBeenCalledWith(mockSesion);
    });
    it('updateSesion - success', async () => {
        updateSesionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateSesion('1', mockSesion)).resolves.toBe(mockRespuesta);
        expect(updateSesionUseCase.execute).toHaveBeenCalledWith('1', mockSesion);
    });
    it('deleteSesion - success', async () => {
        deleteSesionUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.deleteSesion('1')).resolves.toBe(mockRespuesta);
        expect(deleteSesionUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('updateSesiones - success', async () => {
        updateSesionesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateSesiones(mockEditarSesiones)).resolves.toBe(mockRespuesta);
        expect(updateSesionesUseCase.execute).toHaveBeenCalledWith(mockEditarSesiones);
    });
});
//# sourceMappingURL=sesiones-controller.spec.js.map