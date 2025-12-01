"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_persona_sede_1 = require("../../personas-sedes/delete-persona-sede");
describe('DeletePersonaSedeUseCaseImpl', () => {
    const personaSedeRepository = {
        deleteById: jest.fn(),
    };
    const useCase = new delete_persona_sede_1.DeletePersonaSedeUseCaseImpl(personaSedeRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deleteById con el id correcto', async () => {
        personaSedeRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(personaSedeRepository.deleteById).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        personaSedeRepository.deleteById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personaSedeRepository.deleteById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-persona-sede.spec.js.map