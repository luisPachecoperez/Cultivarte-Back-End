"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_asistencia_1 = require("../../asistencias/delete-asistencia");
describe('DeleteAsistenciaUseCaseImpl', () => {
    const asistenciaRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_asistencia_1.DeleteAsistenciaUseCaseImpl(asistenciaRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminada' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta deleteById y retorna la respuesta', async () => {
        asistenciaRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('1');
        expect(asistenciaRepository.deleteById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-asistencia.spec.js.map