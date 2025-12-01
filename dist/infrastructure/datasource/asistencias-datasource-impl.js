"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsistenciaDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const asistencia_queries_1 = require("../db/asistencia-queries");
const sesiones_queries_1 = require("../db/sesiones-queries");
class AsistenciaDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.asistenciasResult);
            return result.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividades por sedes: ' + JSON.stringify(error),
            };
        }
    }
    async getById(id_asistencia) {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.asistenciasResult, [id_asistencia]);
            return result.rows[0] || null;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividades por sedes: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getAsistenciasSede(id_usuario, fecha_inicio, fecha_fin) {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.asistenciaSedesResult, [id_usuario, fecha_inicio, fecha_fin]);
            return result.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividades por sedes: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createAsistencia(asistencia) {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.insertAsistencia, [
                asistencia.id_asistencia,
                asistencia.id_sesion,
                asistencia.id_persona,
                asistencia.id_creado_por,
                asistencia.fecha_creacion,
                asistencia.id_modificado_por,
                asistencia.fecha_modificacion,
            ]);
            return result.rows[0];
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividades por sedes: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateAsistencias(asistenciaSesiones) {
        try {
            if (asistenciaSesiones.nuevos === null) {
                await this.pool.query(asistencia_queries_1.asistenciasQueries.updateSesiones, [
                    asistenciaSesiones.id_sesion,
                    asistenciaSesiones.id_actividad,
                    asistenciaSesiones.imagen,
                    asistenciaSesiones.numero_asistentes,
                    asistenciaSesiones.descripcion,
                ]);
                return {
                    exitoso: 'S',
                    mensaje: 'Asistencia actualizada correctamente',
                };
            }
            else if (Array.isArray(asistenciaSesiones.nuevos) &&
                asistenciaSesiones.nuevos.length > 0) {
                for (let i = 0; i < asistenciaSesiones.nuevos.length; i++) {
                    await this.pool.query(asistencia_queries_1.asistenciasQueries.updateAsistencia, [
                        asistenciaSesiones.nuevos[i].id_asistencia,
                        asistenciaSesiones.nuevos[i].id_sesion,
                        asistenciaSesiones.nuevos[i].id_persona,
                    ]);
                }
                return {
                    exitoso: 'S',
                    mensaje: 'Asistencia actualizada correctamente',
                };
            }
            else {
                return {
                    exitoso: 'N',
                    mensaje: 'No se pudo actualizar la asistencia',
                };
            }
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar la asistencia: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_asistencia, asistencia) {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.updateAsistenciaById, [
                id_asistencia,
                asistencia.id_sesion,
                asistencia.id_persona,
                asistencia.id_modificado_por,
                asistencia.fecha_modificacion,
            ]);
            if (result.rowCount && result.rowCount > 0) {
                return {
                    exitoso: 'S',
                    mensaje: 'Asistencia actualizada correctamente',
                };
            }
            else {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la asistencia a actualizar',
                };
            }
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar la asistencia: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_asistencia) {
        try {
            const result = await this.pool.query(asistencia_queries_1.asistenciasQueries.deleteAsistencia, [id_asistencia]);
            if (result.rowCount && result.rowCount > 0) {
                return {
                    exitoso: 'S',
                    mensaje: 'Asistencia eliminada correctamente',
                };
            }
            else {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la asistencia a eliminar',
                };
            }
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar la asistencia: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getPreAsistencia(id_sesion) {
        try {
            console.log('id_sesion:', id_sesion);
            const sesionResult = await this.pool.query(sesiones_queries_1.sesionesQueries.getById, [
                id_sesion,
            ]);
            const sesion = sesionResult.rows[0] || null;
            console.log('sesion object:', JSON.stringify(sesion, null, 2));
            if (!sesion) {
                return {
                    exitoso: 'N',
                    mensaje: 'Sesión no encontrada',
                };
            }
            const actividadId = sesion.id_actividad;
            const actividadResult = await this.pool.query(asistencia_queries_1.asistenciasQueries.actividadResult, [actividadId]);
            const actividad = actividadResult.rows[0] || null;
            if (!actividad) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la actividad asociada a la sesión',
                };
            }
            try {
                const [sedesResult, beneficiariosResult, asistentesSesionesResult] = await Promise.all([
                    this.pool.query(asistencia_queries_1.asistenciasQueries.getSedes),
                    this.pool.query(asistencia_queries_1.asistenciasQueries.beneficiariosResult),
                    this.pool.query(asistencia_queries_1.asistenciasQueries.getAsistentesSesiones, [id_sesion]),
                ]);
                const parametrosResult = await this.pool.query(asistencia_queries_1.asistenciasQueries.parametrosDetalleActividadResult, [actividad.id_tipo_actividad]);
                const parametro_actividad = parametrosResult.rows[0];
                const foto = parametro_actividad?.nombre === 'Actividad institucional' ||
                    parametro_actividad?.nombre === 'Ludoteca viajera'
                    ? 'S'
                    : 'N';
                const preAsistencia = {
                    id_sesion: sesion.id_sesion,
                    id_sede: actividad.id_sede || '1',
                    numero_asistentes: Number(sesion.nro_asistentes) || 0,
                    foto: foto,
                    descripcion: sesion.descripcion || '',
                    imagen: sesion.imagen || '',
                    sedes: sedesResult.rows,
                    beneficiarios: beneficiariosResult.rows,
                    asistentes_sesiones: asistentesSesionesResult.rows,
                };
                console.log('preAsistencia object:', JSON.stringify(preAsistencia, null, 2));
                return preAsistencia;
            }
            catch (error) {
                console.error('Error en consultas de pre-asistencia:', error);
                return {
                    exitoso: 'N',
                    mensaje: 'Error al obtener datos de pre-asistencia: ' +
                        (error instanceof Error ? error.message : JSON.stringify(error)),
                };
            }
        }
        catch (error) {
            console.error('Error general en getPreAsistencia:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener la pre-asistencia',
            };
        }
    }
}
exports.AsistenciaDataSourceImpl = AsistenciaDataSourceImpl;
//# sourceMappingURL=asistencias-datasource-impl.js.map