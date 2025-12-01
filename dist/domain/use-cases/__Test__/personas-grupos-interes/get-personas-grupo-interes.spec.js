"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
describe('GetPersonasGrupoInteresUseCaseImpl', () => {
    const personasGruposInteresRepository = {
        getAll: jest.fn(),
    };
    const useCase = new __1.GetPersonasGrupoInteresUseCaseImpl(personasGruposInteresRepository);
    const mockPersonasGrupoInteres = [
        { id: '1', nombre: 'Grupo 1' },
        { id: '2', nombre: 'Grupo 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de PersonaGrupoInteres correctamente', async () => {
        personasGruposInteresRepository.getAll.mockResolvedValueOnce(mockPersonasGrupoInteres);
        const result = await useCase.execute();
        expect(personasGruposInteresRepository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockPersonasGrupoInteres);
    });
    it('retorna respuesta de error', async () => {
        personasGruposInteresRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasGruposInteresRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-personas-grupo-interes.spec.js.map