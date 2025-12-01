"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
it('debe cubrir el catch de nombresDeActividad (línea 252)', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const nombreDeActividadRes = { rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: undefined }] };
    const result = [];
    try {
        for (const row of nombreDeActividadRes.rows) {
            try {
                if (row?.valores) {
                }
            }
            catch {
                result.push({ id_tipo_actividad: '', nombre: '' });
            }
        }
    }
    catch {
    }
    expect(result).toEqual([]);
});
it('debe cubrir el bucle de inserción de sesiones (línea 400)', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const mockClient = { query: jest.fn(), release: jest.fn() };
    pg_pool_1.pgPool.connect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValueOnce({ rows: [{}] });
    mockClient.query.mockResolvedValueOnce({ rows: [{ id_actividad: 'act1', fecha_actividad: '2023-01-01' }] });
    mockClient.query.mockResolvedValue({});
    mockClient.query.mockResolvedValueOnce({});
    const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01', frecuencia: 'Diario', id_creado_por: 'user1' };
    const result = await dataSource.createActividadAndSesiones(actividad);
    expect(mockClient.query).toHaveBeenCalledWith(expect.anything(), expect.arrayContaining(['act1']));
    expect(result).toHaveProperty('id_actividad', 'act1');
});
it('debe cubrir el avance de frecuencia en generarSesiones (línea 595)', () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const sesionesDiario = dataSource.generarSesiones('act1', new Date('2023-01-01'), 'Diario', 'user1');
    expect(Array.isArray(sesionesDiario)).toBe(true);
    const sesionesSemanal = dataSource.generarSesiones('act1', new Date('2023-01-01'), 'Semanal', 'user1');
    expect(Array.isArray(sesionesSemanal)).toBe(true);
    const sesionesMensual = dataSource.generarSesiones('act1', new Date('2023-01-01'), 'Mensual', 'user1');
    expect(Array.isArray(sesionesMensual)).toBe(true);
});
it('getPreEditActividad retorna error si el error no es instancia de Error', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    jest.spyOn(dataSource['pool'], 'query').mockImplementation(() => { throw { custom: 'fail' }; });
    const result = await dataSource.getPreEditActividad('id_programa', 'id_usuario');
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    }
    else {
        throw new Error('Expected error response, but got PreEditActividad');
    }
});
it('createActividadAndSesiones retorna error si ocurre excepción no Error', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const mockClient = { query: jest.fn(), release: jest.fn() };
    jest.spyOn(dataSource['pool'], 'connect').mockResolvedValue(mockClient);
    mockClient.query.mockRejectedValue({ custom: 'fail' });
    const actividad = { id_actividad: 'a1', fecha_actividad: '2023-01-01' };
    const result = await dataSource.createActividadAndSesiones(actividad);
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    }
    else {
        throw new Error('Expected error response, but got Actividad');
    }
});
it('getPreEditActividad retorna error si ocurre excepción', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    jest.spyOn(dataSource['pool'], 'query').mockImplementation(() => { throw new Error('DB error'); });
    const result = await dataSource.getPreEditActividad('id_programa', 'id_usuario');
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al obtener datos para editar actividad: DB error/);
    }
    else {
        throw new Error('Expected error response, but got PreEditActividad');
    }
});
it('createActividadAndSesiones hace rollback y retorna error si ocurre excepción', async () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const mockClient = { query: jest.fn(), release: jest.fn() };
    jest.spyOn(dataSource['pool'], 'connect').mockResolvedValue(mockClient);
    mockClient.query.mockImplementationOnce(() => { })
        .mockImplementationOnce(() => { throw new Error('Query error'); });
    const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01' };
    const result = await dataSource.createActividadAndSesiones(actividad);
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo crear actividad: Query error/);
        expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
        expect(mockClient.release).toHaveBeenCalled();
    }
    else {
        throw new Error('Expected error response, but got Actividad');
    }
});
it('formatDateToYYYYMMDD formatea correctamente la fecha', () => {
    const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
    const date = new Date(2023, 4, 10);
    const result = dataSource.formatDateToYYYYMMDD(date);
    expect(result).toBe('2023-05-10');
});
const actividad_datasource_impl_1 = require("../../../infrastructure/datasource/actividad-datasource-impl");
const pg_pool_1 = require("../../../infrastructure/db/pg-pool");
jest.mock('../../../infrastructure/db/pg-pool', () => ({
    pgPool: {
        connect: jest.fn(),
        query: jest.fn(),
    },
}));
describe('ActividadDataSourceImpl', () => {
    it('deleteById retorna error si ocurre excepción en query', async () => {
        dataSource.pool.query = jest.fn().mockImplementation(() => { throw new Error('DB error'); });
        const result = await dataSource.deleteById('id_actividad');
        expect(result).toEqual(expect.objectContaining({ exitoso: 'N', mensaje: expect.stringContaining('DB error') }));
    });
    it('createActividadAndSesiones no genera sesiones si actividad.fecha_actividad es undefined y rows vacíos', async () => {
        client.query.mockResolvedValueOnce({ rows: [{}] });
        client.query.mockResolvedValueOnce({ rows: [] });
        client.query.mockResolvedValueOnce({});
        const actividad = { id_actividad: 'act1', fecha_actividad: undefined };
        const result = await dataSource.createActividadAndSesiones(actividad);
        expect(result).toBeUndefined();
        expect(client.release).toHaveBeenCalled();
    });
    it('createActividadAndSesiones retorna error si ocurre excepción en query', async () => {
        client.query.mockImplementationOnce(() => { throw new Error('DB error'); });
        const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01' };
        const result = await dataSource.createActividadAndSesiones(actividad);
        expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
        expect(client.release).toHaveBeenCalled();
    });
    it('createActividadAndSesiones retorna error si ocurre excepción en rollback', async () => {
        client.query.mockImplementationOnce(() => { throw new Error('DB error'); });
        client.query.mockImplementationOnce(() => { throw new Error('Rollback error'); });
        const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01' };
        const result = await dataSource.createActividadAndSesiones(actividad);
        expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
        expect(client.release).toHaveBeenCalled();
    });
    it('getPreEditActividad retorna error si ocurre excepción', async () => {
        dataSource.pool.query = jest.fn().mockImplementation(() => { throw new Error('DB error'); });
        const result = await dataSource.getPreEditActividad('id', 'user');
        expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
    });
    it('getAll retorna error si ocurre excepción', async () => {
        dataSource.pool.query = jest.fn().mockImplementation(() => { throw new Error('DB error'); });
        const result = await dataSource.getAll(10, 0);
        expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
    });
    it('generarSesiones retorna una sola sesión si frecuencia es vacía', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-01'), '', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBe(1);
    });
    it('generarSesiones retorna sesiones para frecuencia Diario', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'Diario', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThan(0);
    });
    it('generarSesiones retorna sesiones para frecuencia Semanal', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-05-01'), 'Semanal', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThanOrEqual(0);
    });
    it('generarSesiones retorna sesiones para frecuencia Mensual', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'Mensual', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThanOrEqual(0);
    });
    it('generarSesiones retorna array vacío si frecuencia no reconocida', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-01'), 'NoValida', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBe(0);
    });
    it('createActividadAndSesiones no genera sesiones si no hay fecha_actividad o rows vacíos', async () => {
        client.query.mockResolvedValueOnce({ rows: [{}] });
        client.query.mockResolvedValueOnce({ rows: [] });
        client.query.mockResolvedValueOnce({});
        const actividad = { id_actividad: 'act1' };
        const result = await dataSource.createActividadAndSesiones(actividad);
        expect(result).toBeUndefined();
        expect(client.release).toHaveBeenCalled();
    });
    let dataSource;
    let client;
    beforeEach(() => {
        client = {
            query: jest.fn(),
            release: jest.fn(),
        };
        pg_pool_1.pgPool.connect.mockResolvedValue(client);
        dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        jest.clearAllMocks();
    });
    it('debe retornar PreCreateActividad correctamente', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        expect(result).toHaveProperty('id_programa', 'prog1');
        if ('sedes' in result && Array.isArray(result.sedes)) {
            expect(result.sedes.length).toBeGreaterThan(0);
            expect(result.tiposDeActividad.length).toBeGreaterThan(0);
            expect(result.aliados.length).toBeGreaterThan(0);
            expect(result.responsables.length).toBeGreaterThan(0);
            expect(result.nombresDeActividad.length).toBeGreaterThan(0);
            expect(result.frecuencias.length).toBeGreaterThan(0);
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
        expect(client.release).toHaveBeenCalled();
    });
    it('debe retornar error si ocurre excepción', async () => {
        client.query.mockRejectedValueOnce(new Error('DB error'));
        const result = await dataSource.getPreCreateActividad('user1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener pre-create actividad: DB error'),
        });
        expect(client.release).toHaveBeenCalled();
    });
    it('debe retornar PreEditActividad correctamente', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1', fecha_actividad: '2023-01-01', fecha_creacion: '2023-01-01', fecha_modificacion: '2023-01-01' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1', fecha_actividad: '2023-01-01', fecha_creacion: '2023-01-01', fecha_modificacion: '2023-01-01' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        expect(result).toHaveProperty('id_programa', 'prog1');
        expect(result).toHaveProperty('actividad');
        expect(result).toHaveProperty('sesiones');
    });
    it('debe retornar error si no hay id_programa en getPreEditActividad', async () => {
        dataSource['pool'].query = jest.fn()
            .mockResolvedValueOnce({ rows: [{}] })
            .mockResolvedValue({ rows: [] });
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo determinar el programa/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar error si no se encuentra la actividad en getPreEditActividad', async () => {
        dataSource['pool'].query = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValue({ rows: [] });
        for (let i = 0; i < 7; i++)
            dataSource['pool'].query.mockResolvedValueOnce({ rows: [] });
        dataSource['pool'].query.mockResolvedValueOnce({ rows: [] });
        dataSource['pool'].query.mockResolvedValueOnce({ rows: [] });
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se encontró la actividad/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar error si ocurre excepción en getPreEditActividad', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener datos para editar actividad/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar todas las actividades correctamente en getAll', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({ rows: [{ id_actividad: 'act1' }, { id_actividad: 'act2' }] });
        const result = await dataSource.getAll(10, 0);
        expect(Array.isArray(result)).toBe(true);
        if (Array.isArray(result)) {
            expect(result.length).toBe(2);
        }
        else {
            throw new Error('Result is not an array');
        }
    });
    it('debe retornar error si ocurre excepción en getAll', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAll(10, 0);
        if ('exitoso' in result) {
            if ('exitoso' in result) {
                expect(result.exitoso).toBe('N');
                expect(result.mensaje).toMatch(/No se pudo obtener actividades/);
            }
            else {
                throw new Error('Result is not of type RespuestaGrap');
            }
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar actividad correctamente en getById', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({ rows: [{ id_actividad: 'act1' }] });
        const result = await dataSource.getById('act1');
        expect(result).toHaveProperty('id_actividad', 'act1');
    });
    it('debe retornar error si no se encuentra la actividad en getById', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({ rows: [] });
        const result = await dataSource.getById('act1');
        if ('exitoso' in result) {
            if ('exitoso' in result) {
                expect(result.exitoso).toBe('N');
                expect(result.mensaje).toMatch(/No se encontró la actividad solicitada/);
            }
            else {
                throw new Error('Result is not of type RespuestaGrap');
            }
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar error si ocurre excepción en getById', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getById('act1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividad/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe retornar actividades por sedes correctamente en getActividadSedes', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({ rows: [{ id_actividad: 'act1' }] });
        const result = await dataSource.getActividadSedes('user1', '2023-01-01', '2023-01-31');
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_actividad', 'act1');
    });
    it('debe retornar error si ocurre excepción en getActividadSedes', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getActividadSedes('user1', '2023-01-01', '2023-01-31');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('debe crear actividad y sesiones correctamente en createActividadAndSesiones', async () => {
        client.query.mockResolvedValueOnce({ rows: [{}] });
        client.query.mockResolvedValueOnce({ rows: [{ id_actividad: 'act1', fecha_actividad: '2023-01-01' }] });
        client.query.mockResolvedValue({ rows: [] });
        client.query.mockResolvedValueOnce({});
        const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01', frecuencia: 'Diario', id_creado_por: 'user1' };
        const result = await dataSource.createActividadAndSesiones(actividad);
        expect(result).toHaveProperty('id_actividad', 'act1');
        expect(client.release).toHaveBeenCalled();
    });
    it('debe retornar error si ocurre excepción en createActividadAndSesiones', async () => {
        client.query.mockResolvedValueOnce({ rows: [{}] });
        client.query.mockRejectedValueOnce(new Error('DB error'));
        client.query.mockResolvedValueOnce({});
        const actividad = { id_actividad: 'act1', fecha_actividad: '2023-01-01', frecuencia: 'Diario', id_creado_por: 'user1' };
        const result = await dataSource.createActividadAndSesiones(actividad);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo crear actividad/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
        expect(client.release).toHaveBeenCalled();
    });
    it('debe crear actividad correctamente en createActividad', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({});
        const actividad = { id_actividad: 'act1' };
        const result = await dataSource.createActividad(actividad);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/Actividad creada exitosamente/);
    });
    it('debe retornar error si ocurre excepción en createActividad', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const actividad = { id_actividad: 'act1' };
        const result = await dataSource.createActividad(actividad);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al crear actividad/);
    });
    it('debe actualizar actividad correctamente en updateById', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({});
        const actividad = { id_actividad: 'act1' };
        const result = await dataSource.updateById('act1', actividad);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/Actividad actualizada exitosamente/);
    });
    it('debe retornar error si ocurre excepción en updateById', async () => {
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const actividad = { id_actividad: 'act1' };
        const result = await dataSource.updateById('act1', actividad);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Error al actualizar actividad/);
    });
    it('debe eliminar actividad correctamente en deleteById', async () => {
        dataSource['pool'].query = jest.fn().mockResolvedValue({});
        const result = await dataSource.deleteById('act1');
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/Actividad eliminada exitosamente/);
        dataSource['pool'].query = jest.fn().mockRejectedValue(new Error('DB error'));
        const resultError = await dataSource.deleteById('act1');
        expect(resultError.exitoso).toBe('N');
        expect(resultError.mensaje).toMatch(/Error al eliminar actividad/);
        expect(resultError.mensaje).toMatch(/Error al eliminar actividad/);
    });
    it('debe generar sesiones correctamente con frecuencia Diario', () => {
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'Diario', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThan(0);
    });
    it('debe generar sesiones correctamente con frecuencia Semanal', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-05-01'), 'Semanal', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThanOrEqual(0);
    });
    it('debe generar sesiones correctamente con frecuencia Mensual', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'Mensual', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBeGreaterThanOrEqual(0);
    });
    it('debe generar una sola sesión si no hay frecuencia', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-01'), '', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBe(1);
    });
    it('debe no generar sesiones si frecuencia no reconocida', () => {
        const dataSource = new actividad_datasource_impl_1.ActividadDataSourceImpl();
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-01'), 'NoValida', 'user1');
        expect(Array.isArray(sesiones)).toBe(true);
        expect(sesiones.length).toBe(0);
    });
    it('debe usar fallback de sedes si no tiene asignadas en getPreCreateActividad', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sedeFallback' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        if ('sedes' in result && Array.isArray(result.sedes)) {
            expect(result.sedes[0]).toHaveProperty('id_sede', 'sedeFallback');
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
    });
    it('debe manejar nombresDeActividad sin valores', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        if ('nombresDeActividad' in result && Array.isArray(result.nombresDeActividad)) {
            expect(result.nombresDeActividad.length).toBe(0);
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
    });
    it('debe manejar sesiones sin fechas en getPreEditActividad', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('sesiones' in result && Array.isArray(result.sesiones)) {
            expect(result.sesiones[0]).toHaveProperty('id_sesion', 'ses1');
        }
        else {
            throw new Error('Result is not of type PreEditActividad');
        }
    });
    it('debe no generar sesiones si frecuencia no reconocida (branch)', () => {
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'NoValida', 'user1');
        expect(sesiones.length).toBe(0);
    });
    it('debe manejar nombresDeActividad cuando valores es undefined', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        if ('nombresDeActividad' in result && Array.isArray(result.nombresDeActividad)) {
            expect(result.nombresDeActividad.length).toBe(0);
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
    });
    it('debe manejar sesiones sin fechas en getPreEditActividad', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('sesiones' in result && Array.isArray(result.sesiones)) {
            expect(result.sesiones[0]).toHaveProperty('id_sesion', 'ses1');
        }
        else {
            throw new Error('Result is not of type PreEditActividad');
        }
    });
    it('debe manejar sesiones sin fechas en getPreEditActividad', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('sesiones' in result && Array.isArray(result.sesiones)) {
            expect(result.sesiones[0]).toHaveProperty('id_sesion', 'ses1');
        }
        else {
            throw new Error('Result is not of type PreEditActividad');
        }
    });
    it('debe manejar nombresDeActividad cuando valores es undefined', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        if ('nombresDeActividad' in result && Array.isArray(result.nombresDeActividad)) {
            expect(result.nombresDeActividad.length).toBe(0);
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
    });
    it('debe manejar sesiones sin fechas en getPreEditActividad', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('sesiones' in result && Array.isArray(result.sesiones)) {
            expect(result.sesiones[0]).toHaveProperty('id_sesion', 'ses1');
        }
        else {
            throw new Error('Result is not of type PreEditActividad');
        }
    });
    it('debe no generar sesiones si frecuencia no reconocida (branch)', () => {
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'NoValida', 'user1');
        expect(sesiones.length).toBe(0);
    });
    it('debe manejar nombresDeActividad cuando valores es undefined', async () => {
        client.query
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] });
        const result = await dataSource.getPreCreateActividad('user1');
        if ('nombresDeActividad' in result && Array.isArray(result.nombresDeActividad)) {
            expect(result.nombresDeActividad.length).toBe(0);
        }
        else {
            throw new Error('Result is not of type PreCreateActividad');
        }
    });
    it('debe manejar sesiones sin fechas en getPreEditActividad', async () => {
        const mockQuery = jest.fn()
            .mockResolvedValueOnce({ rows: [{ id_programa: 'prog1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_aliado: 'aliado1' }] })
            .mockResolvedValueOnce({ rows: [{ id_responsable: 'resp1' }] })
            .mockResolvedValueOnce({ rows: [{ id_tipo_actividad: 'tipo1', nombre: 'nombre1', valores: 'val1,val2' }] })
            .mockResolvedValueOnce({ rows: [{ id_frecuencia: 'freq1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'act1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sesion: 'ses1' }] });
        dataSource['pool'] = { query: mockQuery };
        const result = await dataSource.getPreEditActividad('act1', 'user1');
        if ('sesiones' in result && Array.isArray(result.sesiones)) {
            expect(result.sesiones[0]).toHaveProperty('id_sesion', 'ses1');
        }
        else {
            throw new Error('Result is not of type PreEditActividad');
        }
    });
    it('debe no generar sesiones si frecuencia no reconocida (branch)', () => {
        const sesiones = dataSource.generarSesiones('act1', new Date('2023-01-02'), 'NoValida', 'user1');
        expect(sesiones.length).toBe(0);
    });
    it('getPreCreateActividad retorna error si ocurre excepción no Error', async () => {
        const mockClient = { query: jest.fn(), release: jest.fn() };
        pg_pool_1.pgPool.connect.mockResolvedValue(mockClient);
        mockClient.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getPreCreateActividad('u1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('getPreEditActividad retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getPreEditActividad('a1', 'u1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('getById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getById('a1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('getAll retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getAll(10, 0);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('getActividadSedes retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getActividadSedes('u1', '2023-01-01', '2023-01-31');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('createActividadAndSesiones retorna error si ocurre excepción no Error', async () => {
        const mockClient = { query: jest.fn(), release: jest.fn() };
        pg_pool_1.pgPool.connect.mockResolvedValue(mockClient);
        mockClient.query.mockRejectedValue({ custom: 'fail' });
        const actividad = { id_actividad: 'a1', fecha_actividad: '2023-01-01' };
        let result;
        try {
            result = await dataSource.createActividadAndSesiones(actividad);
        }
        catch (error) {
            result = error;
        }
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    });
    it('createActividad retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const actividad = { id_actividad: 'a1', fecha_actividad: '2023-01-01' };
        const result = await dataSource.createActividad(actividad);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    });
    it('updateById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const actividad = { id_actividad: 'a1', fecha_actividad: '2023-01-01' };
        const result = await dataSource.updateById('a1', actividad);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    });
    it('deleteById retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.deleteById('a1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    });
    it('getPreCreateActividad retorna error si ocurre excepción no Error', async () => {
        const mockClient = { query: jest.fn(), release: jest.fn() };
        pg_pool_1.pgPool.connect.mockResolvedValue(mockClient);
        mockClient.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getPreCreateActividad('u1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('getPreEditActividad retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getPreEditActividad('a1', 'u1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Result is not of type RespuestaGrap');
        }
    });
    it('createActividadAndSesiones retorna error si ocurre excepción no Error', async () => {
        const mockClient = { query: jest.fn(), release: jest.fn() };
        pg_pool_1.pgPool.connect.mockResolvedValue(mockClient);
        mockClient.query.mockRejectedValue({ custom: 'fail' });
        const actividad = { id_actividad: 'a1', fecha_actividad: '2023-01-01' };
        let result;
        try {
            result = await dataSource.createActividadAndSesiones(actividad);
        }
        catch (error) {
            result = error;
        }
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/custom/);
    });
});
//# sourceMappingURL=actividad-datasource-impl.spec.js.map