"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_persona_1 = require("../../../persona/create-persona");
describe('CreatePersonaUseCaseImpl', () => {
    const personasRepository = {
        createPersona: jest.fn(),
    };
    const useCase = new create_persona_1.CreatePersonaUseCaseImpl(personasRepository);
    const mockPersona = {
        id_persona: '1',
        nombre: 'Persona Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna Persona correctamente', async () => {
        personasRepository.createPersona.mockResolvedValueOnce(mockPersona);
        const result = await useCase.execute(mockPersona);
        expect(personasRepository.createPersona).toHaveBeenCalledWith(mockPersona);
        expect(result).toBe(mockPersona);
    });
    it('retorna respuesta de error', async () => {
        personasRepository.createPersona.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockPersona);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.createPersona.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockPersona)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-persona.spec.js.map