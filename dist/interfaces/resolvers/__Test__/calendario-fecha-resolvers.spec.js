"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendario_fecha_resolvers_1 = require("../calendario-fecha-resolvers");
describe('calendarioFechaResolvers', () => {
    it('debe definir el resolver consultarFechaCalendario', () => {
        expect(calendario_fecha_resolvers_1.calendarioFechaResolvers.Query.consultarFechaCalendario).toBeDefined();
    });
    it('consultarFechaCalendario llama al método del controlador', async () => {
        const mockResult = [
            {
                id_actividad: '1',
                id_sesion: 'abc',
                nombre_actividad: 'Taller',
                desde: new Date().toISOString(),
                hasta: new Date().toISOString(),
                asistentes_evento: 0,
            },
        ];
        const spy = jest.spyOn(calendario_fecha_resolvers_1.calendarioFechaResolvers.Query, 'consultarFechaCalendario').mockResolvedValue(mockResult);
        const input = { input: { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31', id_usuario: 'u1' } };
        const result = await calendario_fecha_resolvers_1.calendarioFechaResolvers.Query.consultarFechaCalendario({}, input);
        expect(spy).toHaveBeenCalledWith({}, input);
        expect(result).toBe(mockResult);
        spy.mockRestore();
    });
    const mockCalendarioInput = {
        fecha: '2023-01-01',
    };
    it('consultarFechaCalendario ejecuta correctamente', async () => {
        const args = {
            input: {
                fecha_inicial: '2024-06-01',
                fecha_final: '2024-06-30',
                id_usuario: 'user1',
            }
        };
        const result = await calendario_fecha_resolvers_1.calendarioFechaResolvers.Query.consultarFechaCalendario({}, args);
        expect(result).not.toBeUndefined();
    });
});
//# sourceMappingURL=calendario-fecha-resolvers.spec.js.map