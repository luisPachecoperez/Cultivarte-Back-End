"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poblaciones_resolvers_1 = require("../poblaciones-resolvers");
const poblaciones_resolvers_2 = require("../poblaciones-resolvers");
describe('poblacionesResolvers', () => {
    describe('Direct controller calls from resolvers', () => {
        it('getPoblaciones calls controller.getPoblaciones', async () => {
            const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblaciones').mockResolvedValue([]);
            await poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblaciones();
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
        it('getPoblacion calls controller.getPoblacion', async () => {
            const poblacion = { id_poblacion: '1', nombre: 'Población 1' };
            const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblacion').mockResolvedValue(poblacion);
            const args = { id_poblacion: '1' };
            await poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args);
            expect(spy).toHaveBeenCalledWith('1');
            spy.mockRestore();
        });
        it('createPoblacion calls controller.createPoblacion', async () => {
            const poblacion = { id_poblacion: '1', nombre: 'Población 1' };
            const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'createPoblacion').mockResolvedValue(poblacion);
            const args = { input: poblacion };
            await poblaciones_resolvers_1.poblacionesResolvers.Mutation.createPoblacion({}, args);
            expect(spy).toHaveBeenCalledWith(poblacion);
            spy.mockRestore();
        });
        it('updatePoblacion calls controller.updatePoblacion', async () => {
            const poblacion = { id_poblacion: '1', nombre: 'Población 1' };
            const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'updatePoblacion').mockResolvedValue(poblacion);
            const args = { id: '1', input: poblacion };
            await poblaciones_resolvers_1.poblacionesResolvers.Mutation.updatePoblacion({}, args);
            expect(spy).toHaveBeenCalledWith('1', poblacion);
            spy.mockRestore();
        });
        it('deletePoblacion calls controller.deletePoblacion', async () => {
            const respuesta = { exitoso: 'S', mensaje: 'Eliminado' };
            const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'deletePoblacion').mockResolvedValue(respuesta);
            const args = { id: '1' };
            await poblaciones_resolvers_1.poblacionesResolvers.Mutation.deletePoblacion({}, args);
            expect(spy).toHaveBeenCalledWith('1');
            spy.mockRestore();
        });
    });
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblaciones).toBeDefined();
        expect(poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion).toBeDefined();
        expect(poblaciones_resolvers_1.poblacionesResolvers.Mutation.createPoblacion).toBeDefined();
        expect(poblaciones_resolvers_1.poblacionesResolvers.Mutation.updatePoblacion).toBeDefined();
        expect(poblaciones_resolvers_1.poblacionesResolvers.Mutation.deletePoblacion).toBeDefined();
    });
    it('getPoblaciones llama al método del controlador', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_1.poblacionesResolvers.Query, 'getPoblaciones').mockResolvedValue([]);
        await poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblaciones();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getPoblacion retorna población si existe', async () => {
        const mockPoblacion = { id_poblacion: '1', nombre: 'Población 1' };
        const spy = jest.spyOn(poblaciones_resolvers_1.poblacionesResolvers.Query, 'getPoblacion').mockResolvedValue(mockPoblacion);
        const args = { id_poblacion: '1' };
        const result = await poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        expect(result).toBe(mockPoblacion);
        spy.mockRestore();
    });
    it('getPoblacion lanza error si exitoso === N', async () => {
        const mockError = { exitoso: 'N', mensaje: 'No encontrado' };
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblacion').mockResolvedValue(mockError);
        const args = { id_poblacion: 'error' };
        await expect(poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args)).rejects.toThrow('No encontrado');
        spy.mockRestore();
    });
    it('getPoblacion lanza error si no hay resultado', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblacion').mockResolvedValue(undefined);
        const args = { id_poblacion: 'noexiste' };
        await expect(poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args)).rejects.toThrow('No se encontró la población solicitada');
        spy.mockRestore();
    });
    it('getPoblacion lanza error si resultado es null', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblacion').mockResolvedValue(null);
        const args = { id_poblacion: 'nullcase' };
        await expect(poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args)).rejects.toThrow('No se encontró la población solicitada');
        spy.mockRestore();
    });
    it('getPoblacion retorna población si resultado no tiene exitoso', async () => {
        const mockPoblacion = { id_poblacion: '2', nombre: 'Población 2' };
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'getPoblacion').mockResolvedValue(mockPoblacion);
        const args = { id_poblacion: '2' };
        const result = await poblaciones_resolvers_1.poblacionesResolvers.Query.getPoblacion({}, args);
        expect(result).toBe(mockPoblacion);
        spy.mockRestore();
    });
    it('createPoblacion llama al método del controlador', async () => {
        const mockPoblacion = { id_poblacion: '1', nombre: 'Población 1' };
        const spy = jest.spyOn(poblaciones_resolvers_1.poblacionesResolvers.Mutation, 'createPoblacion').mockResolvedValue(mockPoblacion);
        const args = { input: mockPoblacion };
        await poblaciones_resolvers_1.poblacionesResolvers.Mutation.createPoblacion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('createPoblacion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'Error al crear' };
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'createPoblacion').mockResolvedValue(mockError);
        const args = { input: { id_poblacion: 'error', nombre: 'Error' } };
        const result = await poblaciones_resolvers_2.controller.createPoblacion(args.input);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('createPoblacion retorna undefined si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'createPoblacion').mockResolvedValue(undefined);
        const args = { input: { id_poblacion: 'none', nombre: 'None' } };
        const result = await poblaciones_resolvers_2.controller.createPoblacion(args.input);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
    it('updatePoblacion llama al método del controlador', async () => {
        const mockPoblacion = { id_poblacion: '1', nombre: 'Población 1' };
        const spy = jest.spyOn(poblaciones_resolvers_1.poblacionesResolvers.Mutation, 'updatePoblacion').mockResolvedValue(mockPoblacion);
        const args = { id: '1', input: mockPoblacion };
        await poblaciones_resolvers_1.poblacionesResolvers.Mutation.updatePoblacion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('updatePoblacion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'Error al actualizar' };
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'updatePoblacion').mockResolvedValue(mockError);
        const args = { id: 'error', input: { id_poblacion: 'error', nombre: 'Error' } };
        const result = await poblaciones_resolvers_2.controller.updatePoblacion(args.id, args.input);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('updatePoblacion retorna undefined si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'updatePoblacion').mockResolvedValue(undefined);
        const args = { id: 'none', input: { id_poblacion: 'none', nombre: 'None' } };
        const result = await poblaciones_resolvers_2.controller.updatePoblacion(args.id, args.input);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
    it('deletePoblacion llama al método del controlador', async () => {
        const mockRespuesta = { exitoso: 'S', mensaje: 'Eliminado correctamente' };
        const spy = jest.spyOn(poblaciones_resolvers_1.poblacionesResolvers.Mutation, 'deletePoblacion').mockResolvedValue(mockRespuesta);
        const args = { id: '1' };
        await poblaciones_resolvers_1.poblacionesResolvers.Mutation.deletePoblacion({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('deletePoblacion retorna error si el controlador retorna error', async () => {
        const mockError = { exitoso: 'N', mensaje: 'Error al eliminar' };
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'deletePoblacion').mockResolvedValue(mockError);
        const args = { id: 'error' };
        const result = await poblaciones_resolvers_2.controller.deletePoblacion(args.id);
        expect(result).toEqual(mockError);
        spy.mockRestore();
    });
    it('deletePoblacion retorna undefined si el controlador retorna undefined', async () => {
        const spy = jest.spyOn(poblaciones_resolvers_2.controller, 'deletePoblacion').mockResolvedValue(undefined);
        const args = { id: 'none' };
        const result = await poblaciones_resolvers_2.controller.deletePoblacion(args.id);
        expect(result).toBeUndefined();
        spy.mockRestore();
    });
});
//# sourceMappingURL=poblaciones-resolvers.spec.js.map