import { SesionEventoDataSource } from "../../domain/datasources/sesion-evento-datasource";
import { SesionEvento } from "../../domain/entities/sesiones-eventos";
import { pgPool } from "../db/pg-pool";

export class SesionEventoDataSourceImpl implements SesionEventoDataSource {
    private pool = pgPool;
    constructor() {}

    async getAll(): Promise<SesionEvento[]> {
        const query = `
            SELECT 
                s.id_sesion,
                s.desde,
                s.hasta,
                s.estado,
                s.creado_por,
                s.fecha_creacion,
                s.modificado_por,
                s.fecha_modificacion,
                e.id_evento,
                e.nombre_evento,
                e.descripcion
            FROM sesiones s
            INNER JOIN eventos e ON s.id_evento = e.id_evento
            `;
        const result = await this.pool.query( query );
        return result.rows;
    }
}