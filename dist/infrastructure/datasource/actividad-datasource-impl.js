"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const actividad_queries_1 = require("../db/actividad-queries");
const node_crypto_1 = require("node:crypto");
class ActividadDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getPreCreateActividad(id_usuario) {
        const client = await this.pool.connect();
        try {
            const [programaRes, sedesRes, tiposDeActividadRes, aliadosRes, responsablesRes, nombreDeActividadRes, frecuenciasRes,] = await Promise.all([
                client.query(actividad_queries_1.actividadQueries.programaRes, [
                    id_usuario,
                ]),
                client.query(actividad_queries_1.actividadQueries.sedesResult, [id_usuario]),
                client.query(actividad_queries_1.actividadQueries.tiposDeActividadResult),
                client.query(actividad_queries_1.actividadQueries.aliadosResult),
                client.query(actividad_queries_1.actividadQueries.responsablesResult),
                client.query(actividad_queries_1.actividadQueries.nombreDeActividadResult),
                client.query(actividad_queries_1.actividadQueries.frecuenciasResult),
            ]);
            const id_programa = programaRes.rows?.[0]?.id_programa ?? '';
            let sedes = sedesRes.rows ?? [];
            if (sedes.length === 0) {
                const allSedesResult = await client.query(actividad_queries_1.actividadQueries.allSedesResult);
                sedes = allSedesResult.rows ?? [];
            }
            const tiposDeActividad = tiposDeActividadRes.rows ?? [];
            const aliados = aliadosRes.rows ?? [];
            const responsables = responsablesRes.rows ?? [];
            const nombreEventosRows = nombreDeActividadRes.rows ?? [];
            const nombresDeActividad = [];
            for (const row of nombreEventosRows) {
                const id_tipo_actividad = row.id_tipo_actividad;
                const nombreBase = row.nombre;
                if (!id_tipo_actividad || !nombreBase)
                    continue;
                if (row.valores) {
                    const valores = row.valores.split(',').map((v) => v.trim());
                    for (const nombre of valores) {
                        if (!nombre)
                            continue;
                        nombresDeActividad.push({ id_tipo_actividad, nombre });
                    }
                }
            }
            const frecuencias = frecuenciasRes.rows ?? [];
            const preCreateEventData = {
                id_programa,
                sedes,
                tiposDeActividad,
                aliados,
                responsables,
                nombresDeActividad,
                frecuencias,
            };
            return preCreateEventData;
        }
        catch (error) {
            console.error('Error in getPreCreateActividad:', error);
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener pre-create actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
        finally {
            client.release();
        }
    }
    async getPreEditActividad(id_actividad, id_usuario) {
        try {
            const [programaRes, sedesRes, tiposDeActividadRes, aliadosRes, responsablesRes, nombreDeActividadRes, frecuenciasRes, actividadRes, sesionesRes,] = await Promise.all([
                this.pool.query(actividad_queries_1.actividadQueries.programaRes, [
                    id_usuario,
                ]),
                this.pool.query(actividad_queries_1.actividadQueries.sedesResult, [id_usuario]),
                this.pool.query(actividad_queries_1.actividadQueries.tiposDeActividadResult),
                this.pool.query(actividad_queries_1.actividadQueries.aliadosResult),
                this.pool.query(actividad_queries_1.actividadQueries.responsablesResult),
                this.pool.query(actividad_queries_1.actividadQueries.nombreDeActividadResult),
                this.pool.query(actividad_queries_1.actividadQueries.frecuenciasResult),
                this.pool.query(actividad_queries_1.actividadQueries.actividadResult, [
                    id_actividad,
                ]),
                this.pool.query(actividad_queries_1.actividadQueries.sesionesResult, [
                    id_actividad,
                ]),
            ]);
            const id_programa = programaRes.rows?.[0]?.id_programa ?? '';
            if (!id_programa) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se pudo determinar el programa para el usuario.',
                };
            }
            let sedes = sedesRes.rows ?? [];
            if (sedes.length === 0) {
                const allSedesResult = await this.pool.query(actividad_queries_1.actividadQueries.allSedesResult);
                sedes = allSedesResult.rows ?? [];
            }
            const tiposDeActividad = tiposDeActividadRes.rows ?? [];
            const aliados = aliadosRes.rows ?? [];
            const responsables = responsablesRes.rows ?? [];
            const actividad = actividadRes.rows?.[0];
            if (!actividad) {
                console.error('No se encontró la actividad con ID:', id_actividad);
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la actividad con el ID proporcionado.',
                };
            }
            if (actividad.fecha_actividad) {
                actividad.fecha_actividad = this.formatDateToYYYYMMDD(actividad.fecha_actividad);
            }
            if (actividad.fecha_creacion) {
                actividad.fecha_creacion = this.formatDateToYYYYMMDD(actividad.fecha_creacion);
            }
            if (actividad.fecha_modificacion) {
                actividad.fecha_modificacion = this.formatDateToYYYYMMDD(actividad.fecha_modificacion);
            }
            const sesiones = sesionesRes.rows ?? [];
            sesiones.forEach((sesion) => {
                if (sesion.fecha_actividad) {
                    sesion.fecha_actividad = this.formatDateToYYYYMMDD(sesion.fecha_actividad);
                }
                if (sesion.fecha_creacion) {
                    sesion.fecha_creacion = this.formatDateToYYYYMMDD(sesion.fecha_creacion);
                }
                if (sesion.fecha_modificacion) {
                    sesion.fecha_modificacion = this.formatDateToYYYYMMDD(sesion.fecha_modificacion);
                }
            });
            const nombreEventosRows = nombreDeActividadRes.rows ?? [];
            const nombresDeActividad = [];
            for (const row of nombreEventosRows) {
                const id_tipo_actividad = row?.id_tipo_actividad;
                const nombreBase = row?.nombre;
                if (!id_tipo_actividad || !nombreBase)
                    continue;
                try {
                    if (row?.valores) {
                        const valores = row.valores.split(',').map((v) => v.trim());
                        for (const nombre of valores) {
                            if (!nombre)
                                continue;
                            nombresDeActividad.push({ id_tipo_actividad, nombre });
                        }
                    }
                }
                catch {
                    nombresDeActividad.push({ id_tipo_actividad: '', nombre: '' });
                }
            }
            const frecuencias = frecuenciasRes.rows ?? [];
            const preEditEventData = {
                id_programa,
                sedes,
                tiposDeActividad,
                aliados,
                responsables,
                nombresDeActividad,
                frecuencias,
                actividad,
                sesiones,
            };
            return preEditEventData;
        }
        catch (error) {
            console.error('Error in getPreEditActividad:', error);
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener datos para editar actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getAll(limit, offset) {
        try {
            const result = await this.pool.query(actividad_queries_1.actividadQueries.actividadesResult, [
                limit,
                offset,
            ]);
            return result.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividades: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_actividad) {
        try {
            const result = await this.pool.query(actividad_queries_1.actividadQueries.actividadResult, [id_actividad]);
            const actividad = result.rows[0];
            if (!actividad) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la actividad solicitada.',
                };
            }
            return actividad;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getActividadSedes(id_usuario, fecha_inicio, fecha_fin) {
        try {
            const result = await this.pool.query(actividad_queries_1.actividadQueries.actividadSedesResult, [fecha_inicio, fecha_fin, id_usuario]);
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
    async createActividadAndSesiones(actividad) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const actividadId = actividad.id_actividad || (0, node_crypto_1.randomUUID)();
            const result = await client.query(actividad_queries_1.actividadQueries.insertActividad, [
                actividadId,
                actividad.id_programa,
                actividad.id_tipo_actividad,
                actividad.id_responsable,
                actividad.id_aliado,
                actividad.id_sede,
                actividad.id_frecuencia,
                actividad.institucional,
                actividad.nombre_actividad,
                actividad.descripcion,
                actividad.fecha_actividad,
                actividad.hora_inicio,
                actividad.hora_fin,
                actividad.plazo_asistencia,
                actividad.estado,
                actividad.id_creado_por,
                actividad.fecha_creacion,
                actividad.id_modificado_por,
                actividad.fecha_modificacion,
            ]);
            if (result.rows.length > 0 &&
                actividad.fecha_actividad &&
                actividad.fecha_actividad) {
                const fechaActividad = new Date(actividad.fecha_actividad);
                const sesiones = this.generarSesiones(actividadId, fechaActividad, actividad.frecuencia || '', actividad.id_creado_por || '', actividad.hora_inicio || '09:00:00', actividad.hora_fin || '12:00:00');
                for (const sesion of sesiones) {
                    await client.query(actividad_queries_1.actividadQueries.insertSesion, [
                        sesion.id_sesion,
                        actividadId,
                        sesion.fecha_actividad,
                        sesion.hora_inicio || '09:00:00',
                        sesion.hora_fin || '12:00:00',
                        sesion.id_creado_por,
                        new Date(),
                        sesion.id_creado_por,
                        new Date(),
                    ]);
                }
            }
            await client.query('COMMIT');
            return result.rows[0];
        }
        catch (error) {
            try {
                await client.query('ROLLBACK');
            }
            catch (rollbackError) {
                console.error('Error en rollback:', rollbackError);
            }
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
        finally {
            client.release();
        }
    }
    async createActividad(actividad) {
        try {
            const actividadId = actividad.id_actividad || (0, node_crypto_1.randomUUID)();
            await this.pool.query(actividad_queries_1.actividadQueries.insertActividad, [
                actividadId,
                actividad.id_programa,
                actividad.id_tipo_actividad,
                actividad.id_responsable,
                actividad.id_aliado,
                actividad.id_sede,
                actividad.id_frecuencia,
                actividad.institucional,
                actividad.nombre_actividad,
                actividad.descripcion,
                actividad.fecha_actividad,
                actividad.hora_inicio,
                actividad.hora_fin,
                actividad.plazo_asistencia,
                actividad.estado,
                actividad.id_creado_por,
                actividad.fecha_creacion,
                actividad.id_modificado_por,
                actividad.fecha_modificacion,
            ]);
            return { exitoso: 'S', mensaje: 'Actividad creada exitosamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al crear actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_actividad, actividad) {
        try {
            await this.pool.query(actividad_queries_1.actividadQueries.updateActividad, [
                id_actividad,
                actividad.id_programa,
                actividad.id_tipo_actividad,
                actividad.id_responsable,
                actividad.id_aliado,
                actividad.id_sede,
                actividad.id_frecuencia,
                actividad.institucional,
                actividad.nombre_actividad,
                actividad.descripcion,
                actividad.fecha_actividad,
                actividad.hora_inicio,
                actividad.hora_fin,
                actividad.plazo_asistencia,
                actividad.estado,
                actividad.id_creado_por,
                actividad.fecha_creacion,
                actividad.id_modificado_por,
                actividad.fecha_modificacion,
            ]);
            return { exitoso: 'S', mensaje: 'Actividad actualizada exitosamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al actualizar actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_actividad) {
        try {
            await this.pool.query(actividad_queries_1.actividadQueries.deleteActividad, [id_actividad]);
            return { exitoso: 'S', mensaje: 'Actividad eliminada exitosamente' };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al eliminar actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    generarSesiones(idActividad, fechaActividad, frecuencia, idCreadoPor = '', hora_inicio = '09:00:00', hora_fin = '12:00:00') {
        const sesiones = [];
        const fechaActual = new Date(fechaActividad);
        if (!frecuencia) {
            sesiones.push({
                id_sesion: (0, node_crypto_1.randomUUID)(),
                id_actividad: idActividad,
                fecha_actividad: new Date(fechaActividad),
                hora_inicio,
                hora_fin,
                id_creado_por: idCreadoPor,
            });
            return sesiones;
        }
        const year = fechaActividad.getFullYear();
        const month = fechaActividad.getMonth();
        const fechaFin = new Date(year, month + 1, 0);
        if (frecuencia !== 'Diario' &&
            frecuencia !== 'Semanal' &&
            frecuencia !== 'Mensual') {
            return [];
        }
        while (fechaActual <= fechaFin) {
            const diaSemana = fechaActual.getDay();
            if (diaSemana >= 1 && diaSemana <= 6) {
                sesiones.push({
                    id_sesion: (0, node_crypto_1.randomUUID)(),
                    id_actividad: idActividad,
                    fecha_actividad: new Date(fechaActual),
                    hora_inicio,
                    hora_fin,
                    id_creado_por: idCreadoPor,
                });
            }
            if (frecuencia === 'Diario') {
                fechaActual.setDate(fechaActual.getDate() + 1);
            }
            else if (frecuencia === 'Semanal') {
                fechaActual.setDate(fechaActual.getDate() + 7);
            }
            else if (frecuencia === 'Mensual') {
                fechaActual.setMonth(fechaActual.getMonth() + 1);
            }
        }
        return sesiones;
    }
    formatDateToYYYYMMDD(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
exports.ActividadDataSourceImpl = ActividadDataSourceImpl;
//# sourceMappingURL=actividad-datasource-impl.js.map