"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_parametro_general_1 = require("../../parametros-generales/delete-parametro-general");
describe('DeleteParametroGeneralUseCaseImpl', () => {
    const repository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_parametro_general_1.DeleteParametroGeneralUseCaseImpl(repository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('debe llamar deleteById con el id correcto', async () => {
        repository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(repository.deleteById).toHaveBeenCalledWith('1');
    });
    it('debe retornar la respuesta del repositorio', async () => {
        repository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        repository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-parametro-general.spec.js.map