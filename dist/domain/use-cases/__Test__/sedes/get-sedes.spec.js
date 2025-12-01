"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_sedes_1 = require("../../sedes/get-sedes");
describe('GetSedesUseCaseImpl', () => {
    const sedeRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_sedes_1.GetSedesUseCaseImpl(sedeRepository);
    const mockSedes = [
        { id: '1', nombre: 'Sede 1' },
        { id: '2', nombre: 'Sede 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de Sede correctamente', async () => {
        sedeRepository.getAll.mockResolvedValueOnce(mockSedes);
        const result = await useCase.execute();
        expect(sedeRepository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockSedes);
    });
    it('retorna respuesta de error', async () => {
        sedeRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sedeRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-sedes.spec.js.map