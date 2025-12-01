"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_persona_programa_1 = require("../../personas-programa/create-persona-programa");
describe('CreatePersonaProgramaUseCaseImpl', () => {
    const personasProgramaRepository = {
        create: jest.fn(),
    };
    const useCase = new create_persona_programa_1.CreatePersonaProgramaUseCaseImpl(personasProgramaRepository);
    const mockPersonaPrograma = {
        id: '1',
        nombre: 'Programa Test',
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama create con el argumento correcto', async () => {
        personasProgramaRepository.create.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute(mockPersonaPrograma);
        expect(personasProgramaRepository.create).toHaveBeenCalledWith(mockPersonaPrograma);
    });
    it('retorna la respuesta del repositorio', async () => {
        personasProgramaRepository.create.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockPersonaPrograma);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasProgramaRepository.create.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockPersonaPrograma)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-persona-programa.spec.js.map