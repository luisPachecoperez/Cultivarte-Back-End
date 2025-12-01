"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_sedes_datasource_impl_1 = require("../personas-sedes-datasource-impl");
const pg_pool_1 = require("../../db/pg-pool");
jest.mock('../../db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('PersonasSedesDataSourceImpl', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new personas_sedes_datasource_impl_1.PersonasSedesDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAll retorna lista correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_personas_sede: '1' }] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_personas_sede', '1');
    });
    it('getAll retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAll();
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener personas sedes: DB error/);
        }
    });
    it('getById retorna personaSede correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_personas_sede: '1' }] });
        const result = await dataSource.getById('1');
        expect(result).toHaveProperty('id_personas_sede', '1');
    });
    it('getById retorna null si no hay resultado', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [] });
        const result = await dataSource.getById('1');
        expect(result).toBeNull();
    });
    it('getById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getById('1');
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener persona sede: DB error/);
        }
    });
    it('create retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.create(personaSede);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/creada correctamente/);
    });
    it('create retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.create(personaSede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al crear persona sede: DB error/);
    });
    it('updateById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.updateById('1', personaSede);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizada correctamente/);
    });
    it('updateById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.updateById('1', personaSede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al actualizar persona sede: DB error/);
    });
    it('deleteById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/eliminada correctamente/);
    });
    it('deleteById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al eliminar persona sede: DB error/);
    });
    it('getAll retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getAll();
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener personas sedes:/);
            expect(result.mensaje).toMatch(/custom/);
        }
    });
    it('getById retorna null si rows[0] es undefined', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [] });
        const result = await dataSource.getById('1');
        expect(result).toBeNull();
    });
    it('getById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getById('1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener persona sede:/);
            expect(result.mensaje).toMatch(/custom/);
        }
    });
    it('create retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.create(personaSede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al crear persona sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('updateById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
        const result = await dataSource.updateById('1', personaSede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al actualizar persona sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('deleteById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al eliminar persona sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
});
//# sourceMappingURL=personas-sedes-datasource-impl.spec.js.map