"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_persona_programa_1 = require("../../personas-programa/update-persona-programa");
describe('UpdatePersonaProgramaUseCaseImpl', () => {
    const personasProgramaRepository = {
        updateById: jest.fn(),
    };
    const useCase = new update_persona_programa_1.UpdatePersonaProgramaUseCaseImpl(personasProgramaRepository);
    const mockPersonaPrograma = {
        id: '1',
        nombre: 'Programa Test',
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateById con los argumentos correctos', async () => {
        personasProgramaRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockPersonaPrograma);
        expect(personasProgramaRepository.updateById).toHaveBeenCalledWith('1', mockPersonaPrograma);
    });
    it('retorna la respuesta del repositorio', async () => {
        personasProgramaRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockPersonaPrograma);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasProgramaRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockPersonaPrograma)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-persona-programa.spec.js.map