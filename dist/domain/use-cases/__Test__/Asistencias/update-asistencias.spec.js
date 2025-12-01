"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_asistencias_1 = require("../../asistencias/update-asistencias");
describe('UpdateAsistenciasUseCaseImpl', () => {
    const asistenciaRepository = {
        updateAsistencias: jest.fn(),
    };
    const useCase = new update_asistencias_1.UpdateAsistenciasUseCaseImpl(asistenciaRepository);
    const mockSesiones = {
        id_actividad: '1',
        id_sesion: '1',
        imagen: '',
        numero_asistentes: 0,
        descripcion: '',
        nuevos: [],
    };
    const mockRespuesta = {
        exitoso: 'S',
        mensaje: 'Actualizadas',
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta updateAsistencias y retorna la respuesta', async () => {
        asistenciaRepository.updateAsistencias.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockSesiones);
        expect(asistenciaRepository.updateAsistencias).toHaveBeenCalledWith(mockSesiones);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.updateAsistencias.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockSesiones)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-asistencias.spec.js.map