"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendario_fecha_datasource_impl_1 = require("../calendario-fecha-datasource-impl");
const pg_pool_1 = require("../../db/pg-pool");
jest.mock('../../db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('CalendarioFechaDataSourceImpl', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new calendario_fecha_datasource_impl_1.CalendarioFechaDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getByDate retorna eventos correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_evento: 'e1' }] });
        const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
        const result = await dataSource.getByDate(input);
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_evento', 'e1');
    });
    it('getByDate retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
        const result = await dataSource.getByDate(input);
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener eventos por fecha: DB error/);
        }
    });
    it('getByDate retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
        const result = await dataSource.getByDate(input);
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            if ('mensaje' in result) {
                expect(result.mensaje).toMatch(/Error al obtener eventos por fecha:/);
                expect(result.mensaje).toMatch(/custom/);
            }
        }
        if ('exitoso' in result && 'mensaje' in result) {
            expect(result.mensaje).toMatch(/Error al obtener eventos por fecha:/);
            expect(result.mensaje).toMatch(/custom/);
        }
    });
});
//# sourceMappingURL=calendario-fecha-datasource-impl.spec.js.map