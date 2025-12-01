"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const sesiones_queries_1 = require("../db/sesiones-queries");
const node_crypto_1 = require("node:crypto");
class SesionesDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll(limit, offset) {
        try {
            const getAllRes = await this.pool.query(sesiones_queries_1.sesionesQueries.getAll, [
                limit,
                offset,
            ]);
            return getAllRes.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_sesion) {
        try {
            const getByIdRes = await this.pool.query(sesiones_queries_1.sesionesQueries.getById, [
                id_sesion,
            ]);
            const sesion = getByIdRes.rows[0];
            if (!sesion) {
                return {
                    exitoso: 'N',
                    mensaje: 'Sesión no encontrada',
                };
            }
            return sesion;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getSesionesSede(id_usuario, fecha_inicio, fecha_fin) {
        try {
            const getSessionesSedeRes = await this.pool.query(sesiones_queries_1.sesionesQueries.getSessionesSede, [id_usuario, fecha_inicio, fecha_fin]);
            return getSessionesSedeRes.rows;
        }
        catch (error) {
            console.error('Error en getSesionesSede:', error);
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createSesion(sesion) {
        try {
            const id_sesion = sesion.id_sesion || (0, node_crypto_1.randomUUID)();
            const values = [
                id_sesion,
                sesion.id_actividad,
                sesion.fecha_actividad,
                sesion.hora_inicio,
                sesion.hora_fin,
                sesion.imagen,
                sesion.nro_asistentes,
                sesion.descripcion,
                sesion.id_creado_por,
                sesion.fecha_creacion,
                sesion.id_modificado_por,
                sesion.fecha_modificacion,
            ];
            await this.pool.query(sesiones_queries_1.sesionesQueries.create, values);
            return { exitoso: 'S', mensaje: 'Sesion creada correctamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al crear sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_sesion, sesion) {
        try {
            const values = [
                id_sesion,
                sesion.id_actividad,
                sesion.fecha_actividad,
                sesion.hora_inicio,
                sesion.hora_fin,
                sesion.imagen,
                sesion.nro_asistentes,
                sesion.descripcion,
                sesion.id_modificado_por,
                sesion.fecha_modificacion,
            ];
            await this.pool.query(sesiones_queries_1.sesionesQueries.updateById, values);
            return { exitoso: 'S', mensaje: 'Sesion actualizada correctamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al actualizar sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_sesion) {
        try {
            await this.pool.query(sesiones_queries_1.sesionesQueries.deleteById, [id_sesion]);
            return { exitoso: 'S', mensaje: 'Sesion eliminada correctamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al eliminar sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateSesiones(editarSesiones) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const { nuevos, modificados, eliminados } = editarSesiones.sesiones;
            if (nuevos.length) {
                for (const nuevaSesion of nuevos) {
                    const id_sesion = nuevaSesion.id_sesion || (0, node_crypto_1.randomUUID)();
                    await client.query(sesiones_queries_1.sesionesQueries.create, [
                        id_sesion,
                        nuevaSesion.id_actividad,
                        nuevaSesion.fecha_actividad,
                        nuevaSesion.hora_inicio,
                        nuevaSesion.hora_fin,
                        nuevaSesion.imagen ?? '',
                        nuevaSesion.nro_asistentes ?? 0,
                        nuevaSesion.descripcion ?? '',
                        nuevaSesion.id_creado_por ?? null,
                        new Date(),
                        nuevaSesion.id_creado_por ?? null,
                        new Date(),
                    ]);
                }
            }
            if (modificados.length) {
                for (const sesionModificada of modificados) {
                    console.log('Sesion modificada:', sesionModificada);
                    await client.query(sesiones_queries_1.sesionesQueries.updateSesionesById, [
                        sesionModificada.id_sesion,
                        sesionModificada.id_actividad,
                        sesionModificada.fecha_actividad,
                        sesionModificada.hora_inicio,
                        sesionModificada.hora_fin,
                        sesionModificada.imagen ?? '',
                        sesionModificada.nro_asistentes ?? 0,
                        sesionModificada.descripcion ?? '',
                        sesionModificada.id_modificado_por ?? null,
                        new Date(),
                    ]);
                }
            }
            if (eliminados.length) {
                for (const item of eliminados) {
                    await client.query(sesiones_queries_1.sesionesQueries.deleteById, [item.id_sesion]);
                }
            }
            await client.query('COMMIT');
            return { exitoso: 'S', mensaje: 'Sesiones actualizadas correctamente' };
        }
        catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating sessions:', error);
            let mensajeError;
            if (error instanceof Error && error.message) {
                mensajeError = error.message;
            }
            else {
                mensajeError = JSON.stringify(error);
            }
            return {
                exitoso: 'N',
                mensaje: 'Error al actualizar sesiones: ' + mensajeError,
            };
        }
        finally {
            try {
                client.release();
            }
            catch (releaseError) {
                console.error('Error al liberar el cliente:', releaseError);
            }
        }
    }
}
exports.SesionesDataSourceImpl = SesionesDataSourceImpl;
//# sourceMappingURL=sesiones-datasource-impl.js.map