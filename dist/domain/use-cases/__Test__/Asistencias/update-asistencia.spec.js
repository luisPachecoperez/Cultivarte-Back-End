"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_asistencia_1 = require("../../asistencias/update-asistencia");
describe('UpdateAsistenciaUseCaseImpl', () => {
    const asistenciaRepository = {
        updateById: jest.fn(),
    };
    const useCase = new update_asistencia_1.UpdateAsistenciaUseCaseImpl(asistenciaRepository);
    const mockAsistencia = {
        id_asistencia: '1',
        id_sesion: '1',
        id_persona: null,
        id_creado_por: null,
        fecha_creacion: null,
        id_modificado_por: null,
        fecha_modificacion: null,
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizada' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta updateById y retorna la respuesta', async () => {
        asistenciaRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('1', mockAsistencia);
        expect(asistenciaRepository.updateById).toHaveBeenCalledWith('1', mockAsistencia);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('1', mockAsistencia)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-asistencia.spec.js.map