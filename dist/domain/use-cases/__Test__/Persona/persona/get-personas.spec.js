"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_personas_1 = require("../../../persona/get-personas");
describe('GetPersonasUseCaseImpl', () => {
    const personasRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_personas_1.GetPersonasUseCaseImpl(personasRepository);
    const mockPersonas = [
        { id_persona: '1', nombre: 'Persona 1' },
        { id_persona: '2', nombre: 'Persona 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de personas correctamente', async () => {
        personasRepository.getAll.mockResolvedValueOnce(mockPersonas);
        const result = await useCase.execute(10, 0);
        expect(personasRepository.getAll).toHaveBeenCalledWith(10, 0);
        expect(result).toBe(mockPersonas);
    });
    it('retorna respuesta de error', async () => {
        personasRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(5, 2);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(1, 1)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-personas.spec.js.map