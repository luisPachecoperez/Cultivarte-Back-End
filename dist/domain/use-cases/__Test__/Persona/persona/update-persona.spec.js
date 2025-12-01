"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_persona_1 = require("../../../persona/update-persona");
describe('UpdatePersonaUseCaseImpl', () => {
    const personasRepository = {
        updatePersona: jest.fn(),
    };
    const useCase = new update_persona_1.UpdatePersonaUseCaseImpl(personasRepository);
    const mockPersona = {
        id_persona: '1',
        nombre: 'Persona Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updatePersona con los argumentos correctos', async () => {
        personasRepository.updatePersona.mockResolvedValueOnce(mockPersona);
        await useCase.execute('1', mockPersona);
        expect(personasRepository.updatePersona).toHaveBeenCalledWith('1', mockPersona);
    });
    it('retorna Persona correctamente', async () => {
        personasRepository.updatePersona.mockResolvedValueOnce(mockPersona);
        const result = await useCase.execute('2', mockPersona);
        expect(result).toBe(mockPersona);
    });
    it('retorna respuesta de error', async () => {
        personasRepository.updatePersona.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3', mockPersona);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.updatePersona.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4', mockPersona)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-persona.spec.js.map