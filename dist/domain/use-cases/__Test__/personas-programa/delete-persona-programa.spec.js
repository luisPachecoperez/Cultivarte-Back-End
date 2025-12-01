"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_persona_programa_1 = require("../../personas-programa/delete-persona-programa");
describe('DeletePersonaProgramaUseCaseImpl', () => {
    const personasProgramaRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_persona_programa_1.DeletePersonaProgramaUseCaseImpl(personasProgramaRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deleteById con el id correcto', async () => {
        personasProgramaRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(personasProgramaRepository.deleteById).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        personasProgramaRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasProgramaRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-persona-programa.spec.js.map