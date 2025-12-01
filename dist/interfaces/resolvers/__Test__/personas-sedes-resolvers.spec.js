"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_sedes_resolvers_1 = require("../personas-sedes-resolvers");
const personas_sedes_resolvers_2 = require("../personas-sedes-resolvers");
describe('personasSedesResolvers', () => {
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(personas_sedes_resolvers_1.personasSedesResolvers.Query.getPersonaSede).toBeDefined();
        expect(personas_sedes_resolvers_1.personasSedesResolvers.Query.getPersonasSedes).toBeDefined();
        expect(personas_sedes_resolvers_1.personasSedesResolvers.Mutation.createPersonaSede).toBeDefined();
        expect(personas_sedes_resolvers_1.personasSedesResolvers.Mutation.updatePersonaSede).toBeDefined();
        expect(personas_sedes_resolvers_1.personasSedesResolvers.Mutation.deletePersonaSede).toBeDefined();
    });
    it('getPersonaSede llama al método del controlador', async () => {
        const mockPersonaSede = {
            id_personas_sede: 'ps1',
            id_persona: 'p1',
            id_sede: '1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(personas_sedes_resolvers_2.controller, 'getById').mockResolvedValue(mockPersonaSede);
        const args = { id_sede: '1' };
        await personas_sedes_resolvers_1.personasSedesResolvers.Query.getPersonaSede({}, args);
        expect(spy).toHaveBeenCalledWith('1');
        spy.mockRestore();
    });
    it('getPersonasSedes llama al método del controlador', async () => {
        const spy = jest.spyOn(personas_sedes_resolvers_2.controller, 'getAll').mockResolvedValue([]);
        await personas_sedes_resolvers_1.personasSedesResolvers.Query.getPersonasSedes();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('createPersonaSede llama al método del controlador', async () => {
        const mockPersonaSede = {
            id_personas_sede: 'ps1',
            id_persona: 'p1',
            id_sede: '1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(personas_sedes_resolvers_2.controller, 'create').mockResolvedValue(mockPersonaSede);
        const args = { personasSede: mockPersonaSede };
        await personas_sedes_resolvers_1.personasSedesResolvers.Mutation.createPersonaSede({}, args);
        expect(spy).toHaveBeenCalledWith(mockPersonaSede);
        spy.mockRestore();
    });
    it('updatePersonaSede llama al método del controlador', async () => {
        const mockPersonaSede = {
            id_personas_sede: 'ps1',
            id_persona: 'p1',
            id_sede: '1',
            id_creado_por: 'user1',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        const spy = jest.spyOn(personas_sedes_resolvers_2.controller, 'update').mockResolvedValue(mockPersonaSede);
        const args = { id_sede: '1', personasSede: mockPersonaSede };
        await personas_sedes_resolvers_1.personasSedesResolvers.Mutation.updatePersonaSede({}, args);
        expect(spy).toHaveBeenCalledWith('1', mockPersonaSede);
        spy.mockRestore();
    });
    it('deletePersonaSede llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
        const spy = jest.spyOn(personas_sedes_resolvers_2.controller, 'delete').mockResolvedValue(mockRespuesta);
        const args = { id_sede: '1' };
        await personas_sedes_resolvers_1.personasSedesResolvers.Mutation.deletePersonaSede({}, args);
        expect(spy).toHaveBeenCalledWith('1');
        spy.mockRestore();
    });
});
//# sourceMappingURL=personas-sedes-resolvers.spec.js.map