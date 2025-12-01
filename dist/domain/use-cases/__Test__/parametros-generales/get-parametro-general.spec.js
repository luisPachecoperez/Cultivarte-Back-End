"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametro_general_1 = require("../../parametros-generales/get-parametro-general");
describe('GetParametroGeneralUseCaseImpl', () => {
    const repository = {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new get_parametro_general_1.GetParametroGeneralUseCaseImpl(repository);
    const mockParametroGeneral = {
        id_parametro_general: '1',
        nombre: 'General Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna ParametrosGenerales correctamente', async () => {
        repository.getById.mockResolvedValueOnce(mockParametroGeneral);
        const result = await useCase.execute('1');
        expect(repository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockParametroGeneral);
    });
    it('retorna respuesta de error', async () => {
        repository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        repository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-parametro-general.spec.js.map