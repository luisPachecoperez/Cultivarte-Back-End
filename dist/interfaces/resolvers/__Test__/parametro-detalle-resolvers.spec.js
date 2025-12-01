"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametro_detalle_resolvers_1 = require("../parametro-detalle-resolvers");
describe('parametroDetalleResolvers', () => {
    const mockParametroDetalle = {
        id_parametro_detalle: '1',
        id_parametro_general: '2',
    };
    it('debe definir los resolvers de Query y Mutation', () => {
        expect(parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametrosDetalle).toBeDefined();
        expect(parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametroDetalle).toBeDefined();
        expect(parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.createParametroDetalle).toBeDefined();
        expect(parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.updateParametroDetalle).toBeDefined();
        expect(parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.deleteParametroDetalle).toBeDefined();
    });
    it('getParametrosDetalle llama al método del controlador', async () => {
        const spy = jest.spyOn(parametro_detalle_resolvers_1.parametroDetalleResolvers.Query, 'getParametrosDetalle').mockResolvedValue([]);
        await parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametrosDetalle();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('getParametroDetalle llama al método del controlador', async () => {
        const mockParametroDetalle = {
            id_parametro_detalle: '1',
            id_parametro_general: '2',
        };
        const spy = jest.spyOn(parametro_detalle_resolvers_1.parametroDetalleResolvers.Query, 'getParametroDetalle').mockResolvedValue(mockParametroDetalle);
        const args = { id: '1' };
        await parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametroDetalle({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('createParametroDetalle llama al método del controlador', async () => {
        const mockParametroDetalle = {
            id_parametro_detalle: '1',
            id_parametro_general: '2',
        };
        const spy = jest.spyOn(parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation, 'createParametroDetalle').mockResolvedValue(mockParametroDetalle);
        const args = {
            data: mockParametroDetalle
        };
        await parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.createParametroDetalle({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('updateParametroDetalle llama al método del controlador', async () => {
        const mockParametroDetalle = {
            id_parametro_detalle: '1',
            id_parametro_general: '2',
        };
        const spy = jest.spyOn(parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation, 'updateParametroDetalle').mockResolvedValue({
            id_parametro_detalle: '1',
            id_parametro_general: '2',
        });
        const args = {
            id: '1',
            data: {
                id_parametro_detalle: '1',
                id_parametro_general: '2',
            }
        };
        await parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.updateParametroDetalle({}, args);
        expect(spy).toHaveBeenCalledWith({}, args);
        spy.mockRestore();
    });
    it('getParametrosDetalle ejecuta correctamente', async () => {
        jest.spyOn(parametro_detalle_resolvers_1.parametroDetalleResolvers.Query, 'getParametrosDetalle').mockResolvedValue([]);
        const result = await parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametrosDetalle();
        expect(result).not.toBeUndefined();
    });
    it('getParametroDetalle ejecuta correctamente', async () => {
        const args = { id: '1' };
        const result = await parametro_detalle_resolvers_1.parametroDetalleResolvers.Query.getParametroDetalle({}, args);
        expect(result).not.toBeUndefined();
    });
    it('createParametroDetalle ejecuta correctamente', async () => {
        const args = { data: mockParametroDetalle };
        const result = await parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.createParametroDetalle({}, args);
        expect(result).not.toBeUndefined();
    });
    it('updateParametroDetalle ejecuta correctamente', async () => {
        const args = { id: '1', data: mockParametroDetalle };
        const result = await parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.updateParametroDetalle({}, args);
        expect(result).not.toBeUndefined();
    });
    it('deleteParametroDetalle ejecuta correctamente', async () => {
        const args = { id: '1' };
        const result = await parametro_detalle_resolvers_1.parametroDetalleResolvers.Mutation.deleteParametroDetalle({}, args);
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=parametro-detalle-resolvers.spec.js.map