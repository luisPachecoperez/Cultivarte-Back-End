"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_actividad_1 = require("../../Actividad/delete-actividad");
describe('DeleteActividadUseCaseImpl', () => {
    const actividadRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_actividad_1.DeleteActividadUseCaseImpl(actividadRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminada' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta deleteById y retorna la respuesta', async () => {
        actividadRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('1');
        expect(actividadRepository.deleteById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-actividad.spec.js.map