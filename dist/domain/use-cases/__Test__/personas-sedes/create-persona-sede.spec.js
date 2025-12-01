"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_persona_sede_1 = require("../../personas-sedes/create-persona-sede");
describe('CreatePersonaSedeUseCaseImpl', () => {
    const personaSedeRepository = {
        create: jest.fn(),
    };
    const useCase = new create_persona_sede_1.CreatePersonaSedeUseCaseImpl(personaSedeRepository);
    const mockPersonaSede = { id: '1', nombre: 'Sede Test' };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama create con el argumento correcto', async () => {
        personaSedeRepository.create.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute(mockPersonaSede);
        expect(personaSedeRepository.create).toHaveBeenCalledWith(mockPersonaSede);
    });
    it('retorna la respuesta del repositorio', async () => {
        personaSedeRepository.create.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockPersonaSede);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personaSedeRepository.create.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockPersonaSede)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-persona-sede.spec.js.map