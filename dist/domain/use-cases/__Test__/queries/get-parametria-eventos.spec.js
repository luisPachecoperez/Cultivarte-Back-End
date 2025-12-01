"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametria_eventos_1 = require("../../queries/get-parametria-eventos");
describe('GetParametriaEventosUseCaseImpl', () => {
    const repository = {
        getAll: jest.fn(),
    };
    const useCase = new get_parametria_eventos_1.GetParametriaEventosUseCaseImpl(repository);
    const mockEventos = { id: '1', nombre: 'Evento Test' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna ParametriaEventos correctamente', async () => {
        repository.getAll.mockResolvedValueOnce(mockEventos);
        const result = await useCase.execute();
        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockEventos);
    });
    it('retorna null si no hay eventos', async () => {
        repository.getAll.mockResolvedValueOnce(null);
        const result = await useCase.execute();
        expect(result).toBeNull();
    });
    it('propaga errores si ocurren', async () => {
        repository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-parametria-eventos.spec.js.map