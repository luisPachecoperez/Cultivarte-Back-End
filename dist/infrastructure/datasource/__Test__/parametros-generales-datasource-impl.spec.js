"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametros_generales_datasource_impl_1 = require("../parametros-generales-datasource-impl");
const pg_pool_1 = require("../../db/pg-pool");
jest.mock('../../db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('ParametrosGeneralesDataSourceImpl', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new parametros_generales_datasource_impl_1.ParametrosGeneralesDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAll retorna lista correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_parametro_general: '1' }] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_parametro_general', '1');
    });
    it('getAll retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAll();
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener los parametros generales: DB error/);
        }
    });
    it('getById retorna detalle correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_parametro_general: '1' }] });
        const result = await dataSource.getById('1');
        expect(result).toHaveProperty('id_parametro_general', '1');
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
            expect(result.mensaje).toMatch(/Error al obtener parametro general: DB error/);
        }
    });
    it('create retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.create(params);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/creado correctamente/);
    });
    it('create retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.create(params);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al crear parametro general: DB error/);
    });
    it('updateById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.updateById('1', params);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizado correctamente/);
    });
    it('updateById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.updateById('1', params);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al actualizar parametro general: DB error/);
    });
    it('deleteById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/eliminado correctamente/);
    });
    it('deleteById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al eliminar parametro general: DB error/);
    });
    it('getAll retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getAll();
        expect('exitoso' in result).toBe(true);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener los parametros generales:/);
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
            expect(result.mensaje).toMatch(/Error al obtener parametro general:/);
            expect(result.mensaje).toMatch(/custom/);
        }
    });
    it('create retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.create(params);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al crear parametro general:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('updateById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const params = { nombre_parametro: 'n', descripcion: 'd', estado: 'A' };
        const result = await dataSource.updateById('1', params);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al actualizar parametro general:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('deleteById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al eliminar parametro general:/);
        expect(result.mensaje).toMatch(/custom/);
    });
});
//# sourceMappingURL=parametros-generales-datasource-impl.spec.js.map