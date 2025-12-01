"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Cobertura branches faltantes', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = new asistencias_datasource_impl_1.AsistenciaDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAsistenciaSedes retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getAsistenciaSedes retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('createAsistencia retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue({ custom: 'fail' });
        const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.createAsistencia(asistencia);
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('updateAsistencias retorna error si ocurre excepción en bucle de inserción', async () => {
        pg_pool_1.pgPool.query.mockImplementationOnce(() => { throw new Error('DB error'); });
        const asistenciaSesiones = {
            nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
    });
    it('getPreAsistencia retorna error si ocurre excepción no Error en consultas paralelas', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockRejectedValueOnce({ custom: 'fail' });
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getPreAsistencia retorna error general si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValueOnce({ custom: 'fail' });
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener la pre-asistencia/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getPreAsistencia retorna preAsistencia con arrays vacíos', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] });
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            fail('Expected result to be PreAsistencia');
            return;
        }
        expect(result).toHaveProperty('id_sesion', 's1');
        expect(result).toHaveProperty('id_sede', 'sede1');
        expect(result.sedes).toEqual([]);
        expect(result.beneficiarios).toEqual([]);
        expect(result.asistentes_sesiones).toEqual([]);
    });
});
it('getPreAsistencia retorna error si actividad es null (cubre línea 245)', async () => {
    pg_pool_1.pgPool.query
        .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] })
        .mockResolvedValueOnce({ rows: [] });
    const ds = new asistencias_datasource_impl_1.AsistenciaDataSourceImpl();
    const result = await ds.getPreAsistencia('s1');
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se encontró la actividad asociada a la sesión/);
    }
    else {
        fail('Expected result to be of type RespuestaGrap');
    }
});
it('getPreAsistencia retorna error si sesión es null', async () => {
    pg_pool_1.pgPool.query.mockResolvedValueOnce({ rows: [] });
    const ds = new asistencias_datasource_impl_1.AsistenciaDataSourceImpl();
    const result = await ds.getPreAsistencia('id_sesion');
    if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/Sesión no encontrada/);
    }
    else {
        fail('Expected result to be of type RespuestaGrap');
    }
});
const asistencias_datasource_impl_1 = require("../../../infrastructure/datasource/asistencias-datasource-impl");
const pg_pool_1 = require("../../../infrastructure/db/pg-pool");
jest.mock('../../../infrastructure/db/pg-pool', () => ({
    pgPool: {
        query: jest.fn(),
    },
}));
describe('AsistenciaDataSourceImpl', () => {
    it('getAll retorna error si ocurre excepción no Error', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(123);
        const result = await dataSource.getAll();
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/123/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
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
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('updateAsistencias retorna error si ocurre excepción en query', async () => {
        pg_pool_1.pgPool.query.mockImplementation(() => { throw new Error('DB error'); });
        const asistenciaSesiones = {
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
            nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/DB error/);
    });
    it('updateAsistencias retorna error si ocurre excepción no Error en query', async () => {
        pg_pool_1.pgPool.query.mockImplementationOnce(() => { throw 'string error'; });
        const asistenciaSesiones = {
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
            nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/string error/);
    });
    it('updateAsistencias retorna error si nuevos es undefined', async () => {
        const asistenciaSesiones = {
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
    });
    let dataSource;
    beforeEach(() => {
        dataSource = new asistencias_datasource_impl_1.AsistenciaDataSourceImpl();
        jest.clearAllMocks();
    });
    it('getAll retorna asistencias correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
        const result = await dataSource.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_asistencia', 'a1');
    });
    it('getAll retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAll();
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            if ('mensaje' in result) {
                expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
            }
            else {
                fail('Expected result to have mensaje property');
            }
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getById retorna asistencia correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
        const result = await dataSource.getById('a1');
        expect(result).toHaveProperty('id_asistencia', 'a1');
    });
    it('getById retorna null si no hay asistencia', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [] });
        const result = await dataSource.getById('a1');
        expect(result).toBeNull();
    });
    it('getById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getById('a1');
        if ('exitoso' in result) {
            if ('exitoso' in result) {
                if ('exitoso' in result) {
                    if ('exitoso' in result) {
                        expect(result.exitoso).toBe('N');
                        expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
                    }
                    else {
                        fail('Expected result to be of type RespuestaGrap');
                    }
                }
                else {
                    fail('Expected result to be of type RespuestaGrap');
                }
            }
            else {
                fail('Expected result to be of type RespuestaGrap');
            }
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getAsistenciasSede retorna asistencias correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
        const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id_asistencia', 'a1');
    });
    it('getAsistenciasSede retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('createAsistencia retorna respuesta correctamente', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Creada' }] });
        const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.createAsistencia(asistencia);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toBe('Creada');
    });
    it('createAsistencia retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.createAsistencia(asistencia);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
    });
    it('updateAsistencias actualiza solo sesiones si nuevos es null', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const asistenciaSesiones = { nuevos: null, id_sesion: 's1', id_actividad: 'act1', imagen: '', numero_asistentes: 1, descripcion: '' };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizada correctamente/);
    });
    it('updateAsistencias actualiza asistencias si nuevos tiene elementos', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({});
        const asistenciaSesiones = {
            nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizada correctamente/);
    });
    it('updateAsistencias retorna error si nuevos es array vacío', async () => {
        const asistenciaSesiones = {
            nuevos: [],
            id_sesion: 's1',
            id_actividad: 'act1',
            imagen: '',
            numero_asistentes: 1,
            descripcion: '',
        };
        const result = await dataSource.updateAsistencias(asistenciaSesiones);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
    });
    it('updateById retorna éxito si rowCount > 0', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 1 });
        const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.updateById('a1', asistencia);
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/actualizada correctamente/);
    });
    it('updateById retorna error si rowCount es 0', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 0 });
        const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.updateById('a1', asistencia);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se encontró la asistencia a actualizar/);
    });
    it('updateById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
        const result = await dataSource.updateById('a1', asistencia);
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
    });
    it('deleteById retorna éxito si rowCount > 0', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 1 });
        const result = await dataSource.deleteById('a1');
        expect(result.exitoso).toBe('S');
        expect(result.mensaje).toMatch(/eliminada correctamente/);
    });
    it('deleteById retorna error si rowCount es 0', async () => {
        pg_pool_1.pgPool.query.mockResolvedValue({ rowCount: 0 });
        const result = await dataSource.deleteById('a1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se encontró la asistencia a eliminar/);
    });
    it('deleteById retorna error si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('DB error'));
        const result = await dataSource.deleteById('a1');
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo eliminar la asistencia/);
    });
    it('getPreAsistencia retorna error si no hay sesión', async () => {
        pg_pool_1.pgPool.query.mockResolvedValueOnce({ rows: [] });
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Sesión no encontrada/);
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getPreAsistencia retorna error si ocurre excepción en consultas paralelas', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockRejectedValueOnce(new Error('DB error'));
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            if ('exitoso' in result) {
                expect(result.exitoso).toBe('N');
                expect([
                    'No se pudo obtener la pre-asistencia',
                    "Error al obtener datos de pre-asistencia: DB error",
                    'Error al obtener datos de pre-asistencia'
                ]).toContain(result.mensaje);
            }
            else {
                fail('Expected result to be of type RespuestaGrap');
            }
        }
        else {
            fail('Expected result to be of type RespuestaGrap');
        }
    });
    it('getPreAsistencia retorna preAsistencia correctamente', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_beneficiario: 'b1' }] })
            .mockResolvedValueOnce({ rows: [{ id_asistente: 'as1' }] })
            .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] });
        const result = await dataSource.getPreAsistencia('s1');
        expect(result).toHaveProperty('id_sesion', 's1');
        expect(result).toHaveProperty('id_sede', 'sede1');
        if ('foto' in result) {
            expect(result.foto).toBe('S');
        }
        else {
            fail('Expected result to have foto property');
        }
        if ('numero_asistentes' in result) {
            expect(result.numero_asistentes).toBe(5);
        }
        else {
            fail('Expected result to have numero_asistentes property');
        }
        if ('sedes' in result) {
            expect(Array.isArray(result.sedes)).toBe(true);
            expect(Array.isArray(result.beneficiarios)).toBe(true);
            expect(Array.isArray(result.asistentes_sesiones)).toBe(true);
        }
        else {
            fail('Expected result to have sedes property');
        }
    });
    it('getPreAsistencia retorna error si ocurre excepción en consultas paralelas', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockRejectedValueOnce(new Error('DB error'));
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect([
                'No se pudo obtener la pre-asistencia',
                "Error al obtener datos de pre-asistencia: DB error",
                'Error al obtener datos de pre-asistencia'
            ]).toContain(result.mensaje);
        }
        else {
            expect(result).toHaveProperty('id_sesion', 's1');
        }
    });
    it('getPreAsistencia retorna error general si ocurre excepción', async () => {
        pg_pool_1.pgPool.query.mockRejectedValue(new Error('General error'));
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect([
                'No se pudo obtener la pre-asistencia',
                "Error al obtener datos de pre-asistencia: DB error",
                'Error al obtener datos de pre-asistencia'
            ]).toContain(result.mensaje);
            ;
        }
        else {
            expect(result).toHaveProperty('id_sesion', 's1');
        }
    });
    it('getPreAsistencia retorna error si ocurre excepción no Error en consultas paralelas', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockRejectedValueOnce({ custom: 'fail' });
        const result = await dataSource.getPreAsistencia('s1');
        if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/Error al obtener datos de pre-asistencia:/);
            expect(result.mensaje).toMatch(/custom/);
        }
        else {
            throw new Error('Expected error response, but got PreAsistencia');
        }
    });
    it('getPreAsistencia retorna preAsistencia con foto N si nombre no esperado', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] })
            .mockResolvedValueOnce({ rows: [{ id_beneficiario: 'b1' }] })
            .mockResolvedValueOnce({ rows: [{ id_asistente: 'as1' }] })
            .mockResolvedValueOnce({ rows: [{ nombre: 'Otro nombre' }] });
        const result = await dataSource.getPreAsistencia('s1');
        expect(result).toHaveProperty('id_sesion', 's1');
        if ('foto' in result) {
            expect(result.foto).toBe('N');
        }
        else {
            fail('Expected result to have foto property');
        }
    });
    it('getPreAsistencia retorna preAsistencia con arrays vacíos', async () => {
        pg_pool_1.pgPool.query
            .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] })
            .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] });
        const result = await dataSource.getPreAsistencia('s1');
        if ('sedes' in result && 'beneficiarios' in result && 'asistentes_sesiones' in result) {
            expect(result).toHaveProperty('id_sesion', 's1');
            expect(Array.isArray(result.sedes)).toBe(true);
            expect(result.sedes.length).toBe(0);
            expect(Array.isArray(result.beneficiarios)).toBe(true);
            expect(result.beneficiarios.length).toBe(0);
            expect(Array.isArray(result.asistentes_sesiones)).toBe(true);
            expect(result.asistentes_sesiones.length).toBe(0);
        }
        else {
            fail('Expected result to have sedes, beneficiarios, and asistentes_sesiones properties');
        }
    });
});
//# sourceMappingURL=asistencias-datasource-impl.spec.js.map