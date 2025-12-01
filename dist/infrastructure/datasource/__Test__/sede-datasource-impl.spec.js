"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sede_datasource_impl_1 = require("../sede-datasource-impl");
const pg_pool_1 = require("../../db/pg-pool");
jest.mock('../../db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('SedeDataSourceImpl', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new sede_datasource_impl_1.SedeDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAll retorna lista correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_sede: '1' }] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_sede', '1');
    });
    it('getAll retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAll();
        if (!Array.isArray(result)) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener sedes: DB error/);
        }
        else {
            throw new Error('Expected error response, but got array');
        }
    });
    it('getById retorna sede correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 1, rows: [{ id_sede: '1' }] });
        const result = await dataSource.getById('1');
        expect(result).toHaveProperty('id_sede', '1');
    });
    it('getById retorna error si rowCount es 0', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 0, rows: [] });
        const result = await dataSource.getById('1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se encontró la sede/);
        }
        else {
            throw new Error('Expected error response, but got Sede');
        }
    });
    it('getById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getById('1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener la sede: DB error/);
        }
        else {
            throw new Error('Expected error response, but got Sede');
        }
    });
    it('create retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.create(sede);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/creada exitosamente/);
    });
    it('create retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.create(sede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo crear la sede: DB error/);
    });
    it('updateById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.updateById('1', sede);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizada exitosamente/);
    });
    it('updateById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.updateById('1', sede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la sede: DB error/);
    });
    it('deleteById retorna éxito correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/eliminada exitosamente/);
    });
    it('deleteById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo eliminar la sede: DB error/);
    });
    it('getAll retorna array vacío si no hay sedes', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        if (Array.isArray(result)) {
            expect(result.length).toBe(0);
        }
        else {
            throw new Error('Expected result to be an array');
        }
    });
    it('getById retorna sede vacía si rows contiene objeto vacío', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 1, rows: [{}] });
        const result = await dataSource.getById('1');
        expect(result).toEqual({});
    });
    it('getAll retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getAll();
        if (!Array.isArray(result)) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener sedes:/);
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Expected error response, but got array');
        }
    });
    it('getById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getById('1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener la sede:/);
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Expected error response, but got Sede');
        }
    });
    it('create retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.create(sede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo crear la sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('updateById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const sede = { id_sede: '1', nombre: 'Sede' };
        const result = await dataSource.updateById('1', sede);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
    it('deleteById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.deleteById('1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo eliminar la sede:/);
        expect(result.mensaje).toMatch(/custom/);
    });
});
//# sourceMappingURL=sede-datasource-impl.spec.js.map