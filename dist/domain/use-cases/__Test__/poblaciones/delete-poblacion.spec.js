"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_poblacion_1 = require("../../poblaciones/delete-poblacion");
describe('DeletePoblacionUseCaseImpl', () => {
    const poblacionRepository = {
        deletePoblacionById: jest.fn(),
    };
    const useCase = new delete_poblacion_1.DeletePoblacionUseCaseImpl(poblacionRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('debe llamar deletePoblacionById con el id correcto', async () => {
        poblacionRepository.deletePoblacionById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(poblacionRepository.deletePoblacionById).toHaveBeenCalledWith('1');
    });
    it('debe retornar la respuesta del repositorio', async () => {
        poblacionRepository.deletePoblacionById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('debe propagar errores si ocurren', async () => {
        poblacionRepository.deletePoblacionById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-poblacion.spec.js.map