"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_poblacion_1 = require("../../poblaciones/get-poblacion");
describe('GetPoblacionUseCaseImpl', () => {
    const poblacionRepository = {
        getPoblacionById: jest.fn(),
    };
    const useCase = new get_poblacion_1.GetPoblacionUseCaseImpl(poblacionRepository);
    const mockPoblacion = { id: '1', nombre: 'Poblacion Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna Poblacion correctamente', async () => {
        poblacionRepository.getPoblacionById.mockResolvedValueOnce(mockPoblacion);
        const result = await useCase.execute('1');
        expect(poblacionRepository.getPoblacionById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockPoblacion);
    });
    it('retorna respuesta de error', async () => {
        poblacionRepository.getPoblacionById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        poblacionRepository.getPoblacionById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-poblacion.spec.js.map