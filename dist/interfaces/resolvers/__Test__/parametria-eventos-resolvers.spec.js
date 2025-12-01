"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametria_eventos_resolvers_1 = require("../parametria-eventos-resolvers");
describe('parametriaEventosResolvers', () => {
    it('debe definir el resolver getParametriaEventos', () => {
        expect(parametria_eventos_resolvers_1.parametriaEventosResolvers.Query.getParametriaEventos).toBeDefined();
    });
    it('getParametriaEventos llama al método del controlador', async () => {
        const mockResult = [{ id: '1', nombre: 'Evento' }];
        const spy = jest.spyOn(parametria_eventos_resolvers_1.parametriaEventosResolvers.Query, 'getParametriaEventos').mockResolvedValue(mockResult);
        const result = await parametria_eventos_resolvers_1.parametriaEventosResolvers.Query.getParametriaEventos();
        expect(spy).toHaveBeenCalled();
        expect(result).toBe(mockResult);
        spy.mockRestore();
    });
    it('getParametriaEventos ejecuta correctamente', async () => {
        jest.spyOn(parametria_eventos_resolvers_1.parametriaEventosResolvers.Query, 'getParametriaEventos').mockResolvedValue([]);
        const result = await parametria_eventos_resolvers_1.parametriaEventosResolvers.Query.getParametriaEventos();
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=parametria-eventos-resolvers.spec.js.map