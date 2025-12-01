"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_programa_1 = require("../personas-programa");
describe('personasProgramaResolvers', () => {
    const mockPersonaPrograma = {
        id_persona_programa: '1',
        id_persona: '2',
        id_programa: '3',
        id_creado_por: 'user1',
        fecha_creacion: new Date('2023-01-01'),
        id_modificado_por: 'user2',
        fecha_modificacion: new Date('2023-01-02'),
    };
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramaById).toBeDefined();
        expect(personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramas).toBeDefined();
        expect(personas_programa_1.personasProgramaResolvers.Mutation.createPersonaPrograma).toBeDefined();
        expect(personas_programa_1.personasProgramaResolvers.Mutation.updatePersonaPrograma).toBeDefined();
        expect(personas_programa_1.personasProgramaResolvers.Mutation.deletePersonaPrograma).toBeDefined();
    });
    it('getPersonaProgramaById llama al método del controlador', async () => {
        const mockPersonaPrograma = {
            id_persona_programa: '1',
            id_persona: '2',
            id_programa: '3',
            id_creado_por: 'user1',
            fecha_creacion: new Date('2023-01-01'),
            id_modificado_por: 'user2',
            fecha_modificacion: new Date('2023-01-02'),
        };
        const spy = jest.spyOn(personas_programa_1.personasProgramaResolvers.Query, 'getPersonaProgramaById').mockResolvedValue(mockPersonaPrograma);
        const args = { id_persona_programa: '1' };
        await personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramaById({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getPersonaProgramas llama al método del controlador', async () => {
        const spy = jest.spyOn(personas_programa_1.personasProgramaResolvers.Query, 'getPersonaProgramas').mockResolvedValue([]);
        await personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramas();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('createPersonaPrograma llama al método del controlador', async () => {
        const mockPersonaPrograma = {
            id_persona_programa: '1',
            id_persona: '2',
            id_programa: '3',
            id_creado_por: 'user1',
            fecha_creacion: new Date('2023-01-01'),
            id_modificado_por: 'user2',
            fecha_modificacion: new Date('2023-01-02'),
        };
        const spy = jest.spyOn(personas_programa_1.personasProgramaResolvers.Mutation, 'createPersonaPrograma').mockResolvedValue({ exitoso: 'S', mensaje: 'Creado correctamente' });
        const args = { personaPrograma: mockPersonaPrograma };
        await personas_programa_1.personasProgramaResolvers.Mutation.createPersonaPrograma({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('updatePersonaPrograma llama al método del controlador', async () => {
        const spy = jest.spyOn(personas_programa_1.personasProgramaResolvers.Mutation, 'updatePersonaPrograma').mockResolvedValue({ exitoso: 'S', mensaje: 'Actualizado correctamente' });
        const args = { id_persona_programa: '1', personaPrograma: mockPersonaPrograma };
        await personas_programa_1.personasProgramaResolvers.Mutation.updatePersonaPrograma({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('deletePersonaPrograma llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
        const spy = jest.spyOn(personas_programa_1.personasProgramaResolvers.Mutation, 'deletePersonaPrograma').mockResolvedValue(mockRespuesta);
        const args = { id_persona_programa: '1' };
        await personas_programa_1.personasProgramaResolvers.Mutation.deletePersonaPrograma({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getPersonaProgramaById ejecuta correctamente', async () => {
        const args = { id_persona_programa: '1' };
        const result = await personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramaById({}, args);
        expect(result).not.toBeUndefined();
    });
    it('getPersonaProgramas ejecuta correctamente', async () => {
        const result = await personas_programa_1.personasProgramaResolvers.Query.getPersonaProgramas();
        expect(result).not.toBeUndefined();
    });
    it('createPersonaPrograma ejecuta correctamente', async () => {
        const args = { personaPrograma: mockPersonaPrograma };
        const result = await personas_programa_1.personasProgramaResolvers.Mutation.createPersonaPrograma({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updatePersonaPrograma ejecuta correctamente', async () => {
        const args = { id_persona_programa: '1', personaPrograma: mockPersonaPrograma };
        const result = await personas_programa_1.personasProgramaResolvers.Mutation.updatePersonaPrograma({}, args);
        expect(result).not.toBeUndefined();
    });
    it('deletePersonaPrograma ejecuta correctamente', async () => {
        const args = { id_persona_programa: '1' };
        const result = await personas_programa_1.personasProgramaResolvers.Mutation.deletePersonaPrograma({}, args);
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=personas-programa.spec.js.map