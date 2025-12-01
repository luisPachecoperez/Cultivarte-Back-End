"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_persona_grupo_interes_1 = require("../../../use-cases/personas-grupo-interes/create-persona-grupo-interes");
describe('CreatePersonaGrupoInteresUseCaseImpl', () => {
    const personasGruposInteresRepository = {
        create: jest.fn(),
    };
    const useCase = new create_persona_grupo_interes_1.CreatePersonaGrupoInteresUseCaseImpl(personasGruposInteresRepository);
    const mockPersonaGrupoInteres = {
        id: '1',
        nombre: 'Grupo Test',
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama create con el argumento correcto', async () => {
        personasGruposInteresRepository.create.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute(mockPersonaGrupoInteres);
        expect(personasGruposInteresRepository.create).toHaveBeenCalledWith(mockPersonaGrupoInteres);
    });
    it('retorna la respuesta del repositorio', async () => {
        personasGruposInteresRepository.create.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockPersonaGrupoInteres);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasGruposInteresRepository.create.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockPersonaGrupoInteres)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-persona-grupo-interes.spec.js.map