"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
describe('GetPersonaGrupoInteresUseCaseImpl', () => {
    const personasGruposInteresRepository = {
        getById: jest.fn(),
    };
    const useCase = new __1.GetPersonaGrupoInteresUseCaseImpl(personasGruposInteresRepository);
    const mockPersonaGrupoInteres = {
        id: '1',
        nombre: 'Grupo Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getById con el id correcto', async () => {
        personasGruposInteresRepository.getById.mockResolvedValueOnce(mockPersonaGrupoInteres);
        await useCase.execute('1');
        expect(personasGruposInteresRepository.getById).toHaveBeenCalledWith('1');
    });
    it('retorna PersonaGrupoInteres correctamente', async () => {
        personasGruposInteresRepository.getById.mockResolvedValueOnce(mockPersonaGrupoInteres);
        const result = await useCase.execute('2');
        expect(result).toBe(mockPersonaGrupoInteres);
    });
    it('retorna respuesta de error', async () => {
        personasGruposInteresRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasGruposInteresRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-persona-grupo-interes.spec.js.map