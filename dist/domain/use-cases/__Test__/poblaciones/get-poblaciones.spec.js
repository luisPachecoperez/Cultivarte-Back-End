"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_poblaciones_1 = require("../../poblaciones/get-poblaciones");
describe('GetPoblacionesUseCaseImpl', () => {
    const poblacionRepository = {
        getPoblaciones: jest.fn(),
    };
    const useCase = new get_poblaciones_1.GetPoblacionesUseCaseImpl(poblacionRepository);
    const mockPoblaciones = [
        { id: '1', nombre: 'Poblacion 1' },
        { id: '2', nombre: 'Poblacion 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de Poblacion correctamente', async () => {
        poblacionRepository.getPoblaciones.mockResolvedValueOnce(mockPoblaciones);
        const result = await useCase.execute();
        expect(poblacionRepository.getPoblaciones).toHaveBeenCalled();
        expect(result).toBe(mockPoblaciones);
    });
    it('retorna respuesta de error', async () => {
        poblacionRepository.getPoblaciones.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        poblacionRepository.getPoblaciones.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-poblaciones.spec.js.map