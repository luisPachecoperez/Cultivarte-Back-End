import { SesionesDataSource } from "../../domain";
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
    async updateById(id_sesion: string, sesion: Sesion): Promise<Sesion> {
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
    
    async updateSesiones(editarSesiones: EditarSesiones): Promise<boolean> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            
            // nuevas sesiones
            if (editarSesiones.sesiones.nuevos?.length) {
                for (const nuevaSesion of editarSesiones.sesiones.nuevos) {
                    const id_sesion = nuevaSesion.id_sesion || randomUUID();
                    await client.query(sesionesQueries.insertSesion, [
                        id_sesion,
                        nuevaSesion.id_evento,
                        nuevaSesion.fecha_sesion,
                        nuevaSesion.hora_inicio,
                        nuevaSesion.hora_fin
                    ]);
                }
            }
            
            // modificadas sesiones
            if (editarSesiones.sesiones.modificados?.length) {
                for (const sesionModificada of editarSesiones.sesiones.modificados) {
                    await client.query(sesionesQueries.updateSesionesById, [
                        sesionModificada.fecha_sesion,
                        sesionModificada.hora_inicio,
                        sesionModificada.hora_fin,
                        sesionModificada.id_sesion
                    ]);
                }
            }
            
            // eliminadas sesiones
            if (editarSesiones.sesiones.eliminados?.length) {
                for (const sesionEliminada of editarSesiones.sesiones.eliminados) {
                    await client.query(sesionesQueries.deleteById, [
                        sesionEliminada.id_sesion
                    ]);
                }
            }
            
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating sessions:', error);
            return false;
        } finally {
            client.release();
        }
    }
}
