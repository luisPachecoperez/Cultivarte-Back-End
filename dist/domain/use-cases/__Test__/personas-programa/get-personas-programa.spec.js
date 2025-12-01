"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_personas_programa_1 = require("../../personas-programa/get-personas-programa");
describe('GetPersonasProgramaUseCaseImpl', () => {
    const personasProgramaRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_personas_programa_1.GetPersonasProgramaUseCaseImpl(personasProgramaRepository);
    const mockPersonasPrograma = [
        { id: '1', nombre: 'Programa 1' },
        { id: '2', nombre: 'Programa 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de PersonaPrograma correctamente', async () => {
        personasProgramaRepository.getAll.mockResolvedValueOnce(mockPersonasPrograma);
        const result = await useCase.execute();
        expect(personasProgramaRepository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockPersonasPrograma);
    });
    it('retorna respuesta de error', async () => {
        personasProgramaRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasProgramaRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-personas-programa.spec.js.map