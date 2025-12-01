"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_persona_sede_1 = require("../../personas-sedes/get-persona-sede");
describe('GetPersonaSedeUseCaseImpl', () => {
    const personaSedeRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_persona_sede_1.GetPersonaSedeUseCaseImpl(personaSedeRepository);
    const mockPersonaSede = { id: '1', nombre: 'Sede Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getById con el id correcto', async () => {
        personaSedeRepository.getById.mockResolvedValueOnce(mockPersonaSede);
        await useCase.execute('1');
        expect(personaSedeRepository.getById).toHaveBeenCalledWith('1');
    });
    it('retorna PersonasSede correctamente', async () => {
        personaSedeRepository.getById.mockResolvedValueOnce(mockPersonaSede);
        const result = await useCase.execute('2');
        expect(result).toBe(mockPersonaSede);
    });
    it('retorna respuesta de error', async () => {
        personaSedeRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personaSedeRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-persona-sede.spec.js.map