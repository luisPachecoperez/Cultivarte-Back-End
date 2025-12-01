"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_persona_sede_1 = require("../../personas-sedes/update-persona-sede");
describe('UpdatePersonaSedeUseCaseImpl', () => {
    let personaSedeRepository;
    let useCase;
    const mockPersonaSede = {
        id_personas_sede: '1',
        id_persona: '1',
        id_sede: '1',
        id_creado_por: '1',
        fecha_creacion: new Date().toISOString(),
        id_modificado_por: '1',
        fecha_modificacion: new Date().toISOString(),
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        personaSedeRepository = {
            updateById: jest.fn(),
        };
        useCase = new update_persona_sede_1.UpdatePersonaSedeUseCaseImpl(personaSedeRepository);
    });
    it('llama updateById con los argumentos correctos', async () => {
        personaSedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockPersonaSede);
        expect(personaSedeRepository.updateById).toHaveBeenCalledWith('1', mockPersonaSede);
    });
    it('retorna la respuesta del repositorio', async () => {
        personaSedeRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockPersonaSede);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personaSedeRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockPersonaSede)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-persona-sede.spec.js.map