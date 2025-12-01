"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_persona_programa_1 = require("../../personas-programa/get-persona-programa");
describe('GetPersonaProgramaUseCaseImpl', () => {
    const personasProgramaRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_persona_programa_1.GetPersonaProgramaUseCaseImpl(personasProgramaRepository);
    const mockPersonaPrograma = {
        id: '1',
        nombre: 'Programa Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getById con el id correcto', async () => {
        personasProgramaRepository.getById.mockResolvedValueOnce(mockPersonaPrograma);
        await useCase.execute('1');
        expect(personasProgramaRepository.getById).toHaveBeenCalledWith('1');
    });
    it('retorna PersonaPrograma correctamente', async () => {
        personasProgramaRepository.getById.mockResolvedValueOnce(mockPersonaPrograma);
        const result = await useCase.execute('2');
        expect(result).toBe(mockPersonaPrograma);
    });
    it('retorna respuesta de error', async () => {
        personasProgramaRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasProgramaRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-persona-programa.spec.js.map