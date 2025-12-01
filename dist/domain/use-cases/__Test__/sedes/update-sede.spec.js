"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_sede_1 = require("../../sedes/update-sede");
describe('UpdateSedeUseCaseImpl', () => {
    const sedeRepository = {
        updateById: jest.fn(),
    };
    const useCase = new update_sede_1.UpdateSedeUseCaseImpl(sedeRepository);
    const mockSede = { id: '1', nombre: 'Sede Test' };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateById con los argumentos correctos', async () => {
        sedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockSede);
        expect(sedeRepository.updateById).toHaveBeenCalledWith('1', mockSede);
    });
    it('retorna la respuesta del repositorio', async () => {
        sedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockSede);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sedeRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockSede)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-sede.spec.js.map