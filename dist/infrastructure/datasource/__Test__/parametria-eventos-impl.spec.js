"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametria_eventos_impl_1 = require("../parametria-eventos-impl");
const pg_pool_1 = require("../../db/pg-pool");
jest.mock('../../db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('ParametriaEventosDataSourceImpl', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new parametria_eventos_impl_1.ParametriaEventosDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAll retorna lista correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({
            rows: [
                { grupo: 'Roles', id: '1', nombre: 'Admin' },
                { grupo: 'Aliados', id: '2', nombre: 'AliadoX' },
            ],
        });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('grupo', 'Roles');
        expect(result[1]).toHaveProperty('grupo', 'Aliados');
    });
    it('getAll retorna array vacío si no hay resultados', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
    });
    it('getAll lanza error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        await expect(dataSource.getAll()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=parametria-eventos-impl.spec.js.map