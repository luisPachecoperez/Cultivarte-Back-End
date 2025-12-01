"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametros_generales_1 = require("../../parametros-generales/get-parametros-generales");
describe('GetParametrosGeneralesUseCaseImpl', () => {
    const repository = {
        getAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new get_parametros_generales_1.GetParametrosGeneralesUseCaseImpl(repository);
    const mockParametros = [
        { id_parametro_general: '1', nombre: 'General Test' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna ParametrosGenerales[] correctamente', async () => {
        repository.getAll.mockResolvedValueOnce(mockParametros);
        const result = await useCase.execute();
        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockParametros);
    });
    it('retorna respuesta de error', async () => {
        repository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        repository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-parametro-generales.spec.js.map