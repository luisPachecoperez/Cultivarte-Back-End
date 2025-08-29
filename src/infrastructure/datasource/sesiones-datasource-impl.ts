import { RespuestaGrap, SesionesDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { sesionesQueries } from "../db/sesiones-queries";
import { Sesion } from "../../domain/entities/sesion";
import { EditarSesiones } from "../../domain/entities/editar-sesiones";
import { randomUUID } from "crypto";

export class SesionesDataSourceImpl implements SesionesDataSource {
    
    private pool = pgPool;

    async getAll(): Promise<Sesion[]> {
        const getAllRes = await this.pool.query(sesionesQueries.getAll);
        return getAllRes.rows;
    }

    async getById(id_sesion: string): Promise<Sesion | null> {
        const getByIdRes = await this.pool.query( sesionesQueries.getById, [id_sesion] );
        return getByIdRes.rows[0] || null;
    }

    async createSesion(sesion: Sesion): Promise<Sesion> {
        const id_sesion = sesion.id_sesion || randomUUID();
        const values = [
         id_sesion,
         sesion.id_actividad,
         sesion.fecha_actividad,
         sesion.hora_inicio,
         sesion.hora_fin,
         sesion.imagen,
         sesion.nro_asistentes,
         sesion.id_creado_por,
         sesion.fecha_creacion,
         sesion.id_modificado_por,
         sesion.fecha_modificacion,
        ];
        const result = await this.pool.query(sesionesQueries.create, values);
        return result.rows[0];
    }
    async updateById(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap> {
        const values = [
            id_sesion,
            sesion.id_actividad,
            sesion.fecha_actividad,
            sesion.hora_inicio,
            sesion.hora_fin,
            sesion.imagen,
            sesion.nro_asistentes,
            sesion.id_creado_por,
            sesion.fecha_creacion,
            sesion.id_modificado_por,
            sesion.fecha_modificacion,
        ];
        const result = await this.pool.query(sesionesQueries.updateById, values);
        return result.rows[0];
    }
    
    async deleteById(id_sesion: string): Promise<boolean> {
        const result = await this.pool.query(sesionesQueries.deleteById, [id_sesion]);
        return result.rows[0];
    }
    
    async updateSesiones(editarSesiones: EditarSesiones): Promise<RespuestaGrap> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            
            // Normalizar payload: soporta { sesiones: { ... } } y forma plana { nuevos, modificados, eliminados }
            const payload: any = (editarSesiones as any).sesiones ?? editarSesiones;

            // nuevas sesiones
            if (payload?.nuevos?.length) {
                console.log(payload.nuevos);
                for (const nuevaSesion of payload.nuevos) {
                    const id_sesion = nuevaSesion.id_sesion || randomUUID();
                    console.log(id_sesion);
                    await client.query(sesionesQueries.create, [
                        id_sesion,
                        nuevaSesion.id_actividad,
                        nuevaSesion.fecha_actividad,
                        nuevaSesion.hora_inicio,
                        nuevaSesion.hora_fin,
                        nuevaSesion.imagen ?? '',
                        nuevaSesion.nro_asistentes ?? 0,
                        nuevaSesion.id_creado_por ?? null,
                        new Date(),
                        nuevaSesion.id_creado_por ?? null,
                        new Date()
                    ]);
                }
            } 
             
             // modificadas sesiones
            if (payload?.modificados?.length) {
                for (const sesionModificada of payload.modificados) {
                    await client.query(sesionesQueries.updateSesionesById, [
                        sesionModificada.id_sesion,
                        sesionModificada.id_actividad,
                        sesionModificada.fecha_actividad,
                        sesionModificada.hora_inicio,
                        sesionModificada.hora_fin,
                        sesionModificada.imagen ?? '',
                        sesionModificada.nro_asistentes ?? 0,
                        sesionModificada.id_creado_por ?? null,
                        new Date(),
                        sesionModificada.id_modificado_por ?? null,
                        new Date(),
                    ]);
                }
            }
             
             // eliminadas sesiones
            if (payload?.eliminados?.length) {
                for (const item of payload.eliminados) {
                    const id_sesion = typeof item === 'string' ? item : item?.id_sesion;
                    if (!id_sesion) continue;
                    await client.query(sesionesQueries.deleteById, [ id_sesion ]);
                }
            }
             
             await client.query('COMMIT');
             return {exitoso: "S", mensaje: 'Sesiones actualizadas correctamente'};
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating sessions:', error);
            return {exitoso: "N", mensaje: 'Error al actualizar sesiones'};
        } finally {
            client.release();
        }
    }
}
