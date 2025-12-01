"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
describe('DeletePersonaGrupoInteresUseCaseImpl', () => {
    const personasGruposInteresRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new __1.DeletePersonaGrupoInteresUseCaseImpl(personasGruposInteresRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deleteById con el id correcto', async () => {
        personasGruposInteresRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(personasGruposInteresRepository.deleteById).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        personasGruposInteresRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasGruposInteresRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-persona-grupo-interes.spec.js.map