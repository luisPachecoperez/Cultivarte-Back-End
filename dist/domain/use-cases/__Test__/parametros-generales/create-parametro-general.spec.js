"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_parametro_general_1 = require("../../parametros-generales/create-parametro-general");
describe('CreateParametroGeneralUseCaseImpl', () => {
    const repository = {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new create_parametro_general_1.CreateParametroGeneralUseCaseImpl(repository);
    const mockParametrosGenerales = {
        id_parametro_general: '1',
        nombre: 'General Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna ParametrosGenerales correctamente', async () => {
        repository.create.mockResolvedValueOnce(mockParametrosGenerales);
        const result = await useCase.execute(mockParametrosGenerales);
        expect(repository.create).toHaveBeenCalledWith(mockParametrosGenerales);
        expect(result).toBe(mockParametrosGenerales);
    });
    it('retorna respuesta de error', async () => {
        repository.create.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockParametrosGenerales);
        expect(result).toBe(mockRespuesta);
    });
});
//# sourceMappingURL=create-parametro-general.spec.js.map