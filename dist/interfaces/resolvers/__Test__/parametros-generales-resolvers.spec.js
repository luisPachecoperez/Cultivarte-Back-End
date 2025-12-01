"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametros_generales_resolvers_1 = require("../parametros-generales-resolvers");
describe('parametrosGeneralesResolvers', () => {
    const mockParametrosGenerales = {
        id_parametro_general: '1',
        nombre_parametro: 'Test',
    };
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametrosGenerales).toBeDefined();
        expect(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametroGeneral).toBeDefined();
        expect(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.createParametroGeneral).toBeDefined();
        expect(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.updateParametroGeneral).toBeDefined();
        expect(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.deleteParametroGeneral).toBeDefined();
    });
    it('getParametrosGenerales llama al método del controlador', async () => {
        const spy = jest.spyOn(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query, 'getParametrosGenerales').mockResolvedValue([]);
        await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametrosGenerales();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getParametroGeneral llama al método del controlador', async () => {
        const mockParametroGeneral = {
            id_parametro_general: '1',
            nombre_parametro: 'Test',
        };
        const spy = jest.spyOn(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query, 'getParametroGeneral').mockResolvedValue(mockParametroGeneral);
        const args = { id: '1' };
        await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametroGeneral({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('createParametroGeneral llama al método del controlador', async () => {
        const mockParametroGeneral = {
            id_parametro_general: '1',
            nombre_parametro: 'Test',
        };
        const spy = jest.spyOn(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation, 'createParametroGeneral').mockResolvedValue(mockParametroGeneral);
        const args = { data: mockParametroGeneral };
        await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.createParametroGeneral({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('deleteParametroGeneral llama al método del controlador', async () => {
        const mockRespuesta = {
            exitoso: "S",
            mensaje: "Eliminado correctamente",
        };
        const spy = jest.spyOn(parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation, 'deleteParametroGeneral').mockResolvedValue(mockRespuesta);
        const args = { id: '1' };
        await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.deleteParametroGeneral({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getParametrosGenerales ejecuta correctamente', async () => {
        const result = await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametrosGenerales();
        expect(result).not.toBeUndefined();
    });
    it('getParametroGeneral ejecuta correctamente', async () => {
        const args = { id: '1' };
        const result = await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Query.getParametroGeneral({}, args);
        expect(result).not.toBeUndefined();
    });
    it('createParametroGeneral ejecuta correctamente', async () => {
        const args = { data: mockParametrosGenerales };
        const result = await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.createParametroGeneral({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updateParametroGeneral ejecuta correctamente', async () => {
        const args = { id: '1', data: mockParametrosGenerales };
        const result = await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.updateParametroGeneral({}, args);
        expect(result).not.toBeUndefined();
    });
    it('deleteParametroGeneral ejecuta correctamente', async () => {
        const args = { id: '1' };
        const result = await parametros_generales_resolvers_1.parametrosGeneralesResolvers.Mutation.deleteParametroGeneral({}, args);
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=parametros-generales-resolvers.spec.js.map