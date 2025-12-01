"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_sesion_1 = require("../../sesiones/delete-sesion");
describe('DeleteSesionUseCaseImpl', () => {
    const sesionRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_sesion_1.DeleteSesionUseCaseImpl(sesionRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deleteById con el id correcto', async () => {
        sesionRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(sesionRepository.deleteById).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        sesionRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-sesion.spec.js.map