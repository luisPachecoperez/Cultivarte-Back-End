"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_sede_1 = require("../../sedes/get-sede");
describe('GetSedeUseCaseImpl', () => {
    const sedeRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_sede_1.GetSedeUseCaseImpl(sedeRepository);
    const mockSede = { id: '1', nombre: 'Sede Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getById con el id correcto', async () => {
        sedeRepository.getById.mockResolvedValueOnce(mockSede);
        const result = await useCase.execute('1');
        expect(sedeRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockSede);
    });
    it('retorna Sede correctamente', async () => {
        sedeRepository.getById.mockResolvedValueOnce(mockSede);
        const result = await useCase.execute('2');
        expect(result).toBe(mockSede);
    });
    it('retorna respuesta de error', async () => {
        sedeRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sedeRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-sede.spec.js.map