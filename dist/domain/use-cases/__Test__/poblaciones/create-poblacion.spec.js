"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_poblacion_1 = require("../../poblaciones/create-poblacion");
describe('CreatePoblacionUseCaseImpl', () => {
    const poblacionRepository = {
        createPoblacion: jest.fn(),
    };
    const useCase = new create_poblacion_1.CreatePoblacionUseCaseImpl(poblacionRepository);
    const mockPoblacion = { id: '1', nombre: 'Poblacion Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna Poblacion correctamente', async () => {
        poblacionRepository.createPoblacion.mockResolvedValueOnce(mockPoblacion);
        const result = await useCase.execute(mockPoblacion);
        expect(poblacionRepository.createPoblacion).toHaveBeenCalledWith(mockPoblacion);
        expect(result).toBe(mockPoblacion);
    });
    it('retorna respuesta de error', async () => {
        poblacionRepository.createPoblacion.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockPoblacion);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        poblacionRepository.createPoblacion.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockPoblacion)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-poblacion.spec.js.map