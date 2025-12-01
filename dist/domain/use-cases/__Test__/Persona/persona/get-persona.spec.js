"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_persona_1 = require("../../../persona/get-persona");
describe('GetPersonaUseCaseImpl', () => {
    const personasRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_persona_1.GetPersonaUseCaseImpl(personasRepository);
    const mockPersona = {
        id_persona: '1',
        nombre: 'Persona Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna Persona correctamente', async () => {
        personasRepository.getById.mockResolvedValueOnce(mockPersona);
        const result = await useCase.execute('1');
        expect(personasRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockPersona);
    });
    it('retorna respuesta de error', async () => {
        personasRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-persona.spec.js.map