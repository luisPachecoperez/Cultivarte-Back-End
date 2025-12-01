"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_poblacion_1 = require("../../poblaciones/update-poblacion");
describe('UpdatePoblacionUseCaseImpl', () => {
    const poblacionRepository = {
        updatePoblacionById: jest.fn(),
    };
    const useCase = new update_poblacion_1.UpdatePoblacionUseCaseImpl(poblacionRepository);
    const mockPoblacion = { id: '1', nombre: 'Poblacion Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updatePoblacionById con los argumentos correctos', async () => {
        poblacionRepository.updatePoblacionById.mockResolvedValueOnce(mockPoblacion);
        await useCase.execute('1', mockPoblacion);
        expect(poblacionRepository.updatePoblacionById).toHaveBeenCalledWith('1', mockPoblacion);
    });
    it('retorna Poblacion correctamente', async () => {
        poblacionRepository.updatePoblacionById.mockResolvedValueOnce(mockPoblacion);
        const result = await useCase.execute('2', mockPoblacion);
        expect(result).toBe(mockPoblacion);
    });
    it('retorna respuesta de error', async () => {
        poblacionRepository.updatePoblacionById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3', mockPoblacion);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        poblacionRepository.updatePoblacionById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4', mockPoblacion)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-poblacion.spec.js.map