"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asistencia_controller_1 = require("../asistencia-controller");
describe('AsistenciasController', () => {
    const getAsistenciasUseCase = { execute: jest.fn() };
    const getAsistenciaUseCase = { execute: jest.fn() };
    const getAsistenciasSedeUseCase = { execute: jest.fn() };
    const getPreAsistenciaUseCase = { execute: jest.fn() };
    const createAsistenciaUseCase = { execute: jest.fn() };
    const updateAsistenciaUseCase = { execute: jest.fn() };
    const updateAsistenciasUseCase = { execute: jest.fn() };
    const deleteAsistenciaUseCase = { execute: jest.fn() };
    const controller = new asistencia_controller_1.AsistenciasController(getAsistenciasUseCase, getAsistenciaUseCase, getAsistenciasSedeUseCase, getPreAsistenciaUseCase, createAsistenciaUseCase, updateAsistenciaUseCase, updateAsistenciasUseCase, deleteAsistenciaUseCase);
    const mockAsistencia = {
        id: '1',
        nombre: 'Test',
        id_asistencia: 'id_asistencia_1',
        id_sesion: 'id_sesion_1',
    };
    const mockPreAsistencia = {
        id_sesion: 'sesion_1',
        id_sede: 'sede_1',
        numero_asistentes: 10,
        foto: 'foto_url',
        data: 'preAsistencia',
        asistentes: [],
        fecha: '2024-01-01',
        observaciones: 'Ninguna',
        responsable: 'responsable_1',
        imagen: 'imagen_url',
        descripcion: 'descripcion de la preasistencia',
        sedes: [],
        beneficiarios: [],
        asistentes_sesiones: [],
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    const mockSesiones = {
        id_actividad: 'actividad_1',
        id_sesion: 'sesion_1',
        imagen: 'imagen_url',
        numero_asistentes: 0,
        fecha: '2024-01-01',
        sesiones: [],
        descripcion: 'descripcion de la asistencia',
        nuevos: [],
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAsistencias - success', async () => {
        getAsistenciasUseCase.execute.mockResolvedValueOnce([mockAsistencia]);
        await expect(controller.getAsistencias()).resolves.toEqual([
            mockAsistencia,
        ]);
        expect(getAsistenciasUseCase.execute).toHaveBeenCalled();
    });
    it('getAsistencias - error', async () => {
        getAsistenciasUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getAsistencias()).resolves.toBe(mockRespuesta);
    });
    it('getAsistencia - success', async () => {
        getAsistenciaUseCase.execute.mockResolvedValueOnce(mockAsistencia);
        await expect(controller.getAsistencia('1')).resolves.toBe(mockAsistencia);
        expect(getAsistenciaUseCase.execute).toHaveBeenCalledWith('1');
    });
    it('getAsistencia - error', async () => {
        getAsistenciaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getAsistencia('1')).resolves.toBe(mockRespuesta);
    });
    it('getAsistenciasSede - success', async () => {
        getAsistenciasSedeUseCase.execute.mockResolvedValueOnce([mockAsistencia]);
        await expect(controller.getAsistenciasSede('user', '2024-01-01', '2024-01-31')).resolves.toEqual([mockAsistencia]);
        expect(getAsistenciasSedeUseCase.execute).toHaveBeenCalledWith('user', '2024-01-01', '2024-01-31');
    });
    it('getAsistenciasSede - error', async () => {
        getAsistenciasSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getAsistenciasSede('user', '2024-01-01', '2024-01-31')).resolves.toBe(mockRespuesta);
    });
    it('getPreAsistencia - success', async () => {
        getPreAsistenciaUseCase.execute.mockResolvedValueOnce(mockPreAsistencia);
        await expect(controller.getPreAsistencia('sesion')).resolves.toBe(mockPreAsistencia);
        expect(getPreAsistenciaUseCase.execute).toHaveBeenCalledWith('sesion');
    });
    it('getPreAsistencia - error', async () => {
        getPreAsistenciaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getPreAsistencia('sesion')).resolves.toBe(mockRespuesta);
    });
    it('createAsistencia - success', async () => {
        createAsistenciaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.createAsistencia(mockAsistencia)).resolves.toBe(mockRespuesta);
        expect(createAsistenciaUseCase.execute).toHaveBeenCalledWith(mockAsistencia);
    });
    it('updateAsistencia - success', async () => {
        updateAsistenciaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateAsistencia('1', mockAsistencia)).resolves.toBe(mockRespuesta);
        expect(updateAsistenciaUseCase.execute).toHaveBeenCalledWith('1', mockAsistencia);
    });
    it('updateAsistencias - success', async () => {
        updateAsistenciasUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.updateAsistencias(mockSesiones)).resolves.toBe(mockRespuesta);
        expect(updateAsistenciasUseCase.execute).toHaveBeenCalledWith(mockSesiones);
    });
    it('deleteAsistencia - success', async () => {
        deleteAsistenciaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.deleteAsistencia('1')).resolves.toBe(mockRespuesta);
        expect(deleteAsistenciaUseCase.execute).toHaveBeenCalledWith('1');
    });
});
//# sourceMappingURL=asistencia-controller.spec.js.map