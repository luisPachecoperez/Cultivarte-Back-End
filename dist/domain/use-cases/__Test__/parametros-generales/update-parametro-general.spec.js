"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_parametro_general_1 = require("../../parametros-generales/update-parametro-general");
describe('UpdateParametroGeneralUseCaseImpl', () => {
    const repository = {
        updateById: jest.fn(),
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new update_parametro_general_1.UpdateParametroGeneralUseCaseImpl(repository);
    const mockData = {
        id_parametro_general: '1',
        nombre: 'General Test',
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateById con los argumentos correctos', async () => {
        repository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockData);
        expect(repository.updateById).toHaveBeenCalledWith('1', mockData);
    });
    it('retorna la respuesta del repositorio', async () => {
        repository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockData);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        repository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockData)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-parametro-general.spec.js.map