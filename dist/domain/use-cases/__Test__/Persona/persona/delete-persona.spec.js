"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_persona_1 = require("../../../persona/delete-persona");
describe('DeletePersonaUseCaseImpl', () => {
    const personasRepository = {
        deletePersona: jest.fn(),
    };
    const useCase = new delete_persona_1.DeletePersonaUseCaseImpl(personasRepository);
    const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama deletePersona con el id correcto', async () => {
        personasRepository.deletePersona.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1');
        expect(personasRepository.deletePersona).toHaveBeenCalledWith('1');
    });
    it('retorna la respuesta del repositorio', async () => {
        personasRepository.deletePersona.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.deletePersona.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=delete-persona.spec.js.map