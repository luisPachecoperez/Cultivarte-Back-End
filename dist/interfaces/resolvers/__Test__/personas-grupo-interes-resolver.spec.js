"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_grupo_interes_resolver_1 = require("../personas-grupo-interes-resolver");
const controller = {
    getActividadSedes: jest.fn(),
};
const actividadesResolvers = {
    Query: {
        getActividadSedes: async (_, args) => controller.getActividadSedes(args),
    },
};
describe('personasGrupoInteresResolvers', () => {
    const mockPersonaGrupoInteres = {
        id_persona_grupo_interes: '1',
        id_persona: '2',
        id_grupo_interes: '3',
    };
    it('getPersonaGrupoInteresById retorna error si el controlador falla', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No encontrado' };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query, 'getPersonaGrupoInteresById').mockResolvedValue(mockError);
        const args = { id_persona_grupo_interes: 'error' };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonaGrupoInteresById({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('getPersonasGrupoInteres retorna error si el controlador falla', async () => {
        const mockError = { exitoso: 'N', mensaje: 'Error de consulta' };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query, 'getPersonasGrupoInteres').mockResolvedValue(mockError);
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonasGrupoInteres();
        expect(spy).toHaveBeenCalled();
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('createPersonaGrupoInteres retorna error si el controlador falla', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo crear' };
        const mockPersonaGrupoInteres = { id_persona_grupo_interes: '1', id_persona: '2', id_grupo_interes: '3' };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation, 'createPersonaGrupoInteres').mockResolvedValue(mockError);
        const args = { personaGrupoInteres: mockPersonaGrupoInteres };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.createPersonaGrupoInteres({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('updatePersonaGrupoInteres retorna error si el controlador falla', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo actualizar' };
        const mockPersonaGrupoInteres = { id_persona_grupo_interes: '1', id_persona: '2', id_grupo_interes: '3' };
        const args = { id_persona_grupo_interes: '1', personaGrupoInteres: mockPersonaGrupoInteres };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation, 'updatePersonaGrupoInteres').mockResolvedValue(mockError);
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.updatePersonaGrupoInteres({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('deletePersonaGrupoInteres retorna error si el controlador falla', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No se pudo eliminar' };
        const args = { id_persona_grupo_interes: '1' };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation, 'deletePersonaGrupoInteres').mockResolvedValue(mockError);
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.deletePersonaGrupoInteres({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonaGrupoInteresById).toBeDefined();
        expect(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonasGrupoInteres).toBeDefined();
        expect(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.createPersonaGrupoInteres).toBeDefined();
        expect(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.updatePersonaGrupoInteres).toBeDefined();
        expect(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.deletePersonaGrupoInteres).toBeDefined();
    });
    it('getPersonaGrupoInteresById llama al método del controlador', async () => {
        const mockPersonaGrupoInteres = {
            id_persona_grupo_interes: '1',
            id_persona: '2',
            id_grupo_interes: '3',
        };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query, 'getPersonaGrupoInteresById').mockResolvedValue(mockPersonaGrupoInteres);
        const args = { id_persona_grupo_interes: '1' };
        await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonaGrupoInteresById({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getPersonasGrupoInteres llama al método del controlador', async () => {
        const mockPersonaGrupoInteres = {
            id_persona_grupo_interes: '1',
            id_persona: '2',
            id_grupo_interes: '3',
        };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query, 'getPersonasGrupoInteres').mockResolvedValue([mockPersonaGrupoInteres]);
        await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonasGrupoInteres();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getActividadSedes retorna resultado si exitoso !== N', async () => {
        const mockResult = [{
                id_actividad: '1',
                id_programa: 'p1',
                id_tipo_actividad: 't1',
                id_responsable: 'r1',
                id_aliado: 'a1',
                id_sede: 's1',
                id_frecuencia: 'f1',
                institucional: 'S',
                nombre_actividad: 'Taller',
                descripcion: 'Descripción',
                fecha_actividad: new Date().toISOString(),
                hora_inicio: '08:00:00',
                hora_fin: '10:00:00',
                plazo_asistencia: new Date(),
                estado: 'A',
                id_creado_por: 'user1',
                fecha_creacion: new Date().toISOString(),
                id_modificado_por: 'user2',
                fecha_modificacion: new Date().toISOString(),
            }];
        jest.spyOn(controller, 'getActividadSedes').mockResolvedValue(mockResult);
        const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
        const result = await actividadesResolvers.Query.getActividadSedes({}, args);
        expect(controller.getActividadSedes).toHaveBeenCalledWith(args);
        expect(result).toBe(mockResult);
    });
    it('updatePersonaGrupoInteres llama al método del controlador', async () => {
        const mockPersonaGrupoInteres = { id_persona_grupo_interes: '1', id_persona: '2', id_grupo_interes: '3' };
        const mockRespuesta = { exitoso: "S", mensaje: "Actualización exitosa" };
        const args = { id_persona_grupo_interes: '1', personaGrupoInteres: mockPersonaGrupoInteres };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation, 'updatePersonaGrupoInteres').mockResolvedValue(mockRespuesta);
        await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.updatePersonaGrupoInteres({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('deletePersonaGrupoInteres llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: "S", mensaje: "Eliminado correctamente" };
        const spy = jest.spyOn(personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation, 'deletePersonaGrupoInteres').mockResolvedValue(mockRespuesta);
        const args = { id_persona_grupo_interes: '1' };
        await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.deletePersonaGrupoInteres({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getPersonaGrupoInteresById ejecuta correctamente', async () => {
        const args = { id_persona_grupo_interes: '1' };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonaGrupoInteresById({}, args);
        expect(result).not.toBeUndefined();
    });
    it('getPersonasGrupoInteres ejecuta correctamente', async () => {
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Query.getPersonasGrupoInteres();
        expect(result).not.toBeUndefined();
    });
    it('createPersonaGrupoInteres ejecuta correctamente', async () => {
        const args = { personaGrupoInteres: mockPersonaGrupoInteres };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.createPersonaGrupoInteres({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updatePersonaGrupoInteres ejecuta correctamente', async () => {
        const args = { id_persona_grupo_interes: '1', personaGrupoInteres: mockPersonaGrupoInteres };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.updatePersonaGrupoInteres({}, args);
        expect(result).not.toBeUndefined();
    });
    it('deletePersonaGrupoInteres ejecuta correctamente', async () => {
        const args = { id_persona_grupo_interes: '1' };
        const result = await personas_grupo_interes_resolver_1.personasGrupoInteresResolvers.Mutation.deletePersonaGrupoInteres({}, args);
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=personas-grupo-interes-resolver.spec.js.map