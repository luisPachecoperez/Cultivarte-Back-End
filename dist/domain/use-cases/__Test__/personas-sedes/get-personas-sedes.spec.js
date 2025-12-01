"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_personas_sedes_1 = require("../../personas-sedes/get-personas-sedes");
describe('GetPersonasSedesUseCaseImpl', () => {
    const personaSedeRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_personas_sedes_1.GetPersonasSedesUseCaseImpl(personaSedeRepository);
    const mockPersonasSede = [
        { id: '1', nombre: 'Sede 1' },
        { id: '2', nombre: 'Sede 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de PersonasSede correctamente', async () => {
        personaSedeRepository.getAll.mockResolvedValueOnce(mockPersonasSede);
        const result = await useCase.execute();
        expect(personaSedeRepository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockPersonasSede);
    });
    it('retorna respuesta de error', async () => {
        personaSedeRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personaSedeRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-personas-sedes.spec.js.map