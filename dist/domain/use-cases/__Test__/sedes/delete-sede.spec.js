"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_sede_1 = require("../../sedes/delete-sede");
describe('DeleteSedeUseCaseImpl', () => {
    const sedeRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_sede_1.DeleteSedeUseCaseImpl(sedeRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deleteById con el id correcto', async () => {
        sedeRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(sedeRepository.deleteById).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        sedeRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sedeRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-sede.spec.js.map