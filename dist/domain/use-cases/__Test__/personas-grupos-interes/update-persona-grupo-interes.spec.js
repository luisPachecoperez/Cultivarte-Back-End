"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
describe('UpdatePersonaGrupoInteresUseCaseImpl', () => {
    const personasGruposInteresRepository = {
        updateById: jest.fn(),
    };
    const useCase = new __1.UpdatePersonaGrupoInteresUseCaseImpl(personasGruposInteresRepository);
    const mockPersonaGrupoInteres = {
        id: '1',
        nombre: 'Grupo Test',
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateById con los argumentos correctos', async () => {
        personasGruposInteresRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockPersonaGrupoInteres);
        expect(personasGruposInteresRepository.updateById).toHaveBeenCalledWith('1', mockPersonaGrupoInteres);
    });
    it('retorna la respuesta del repositorio', async () => {
        personasGruposInteresRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockPersonaGrupoInteres);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasGruposInteresRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockPersonaGrupoInteres)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-persona-grupo-interes.spec.js.map