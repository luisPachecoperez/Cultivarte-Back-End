import { Evento } from "../../domain";
import { EventoDataSource } from "../../domain/datasources/evento-datasource";
import { pgPool } from "../db/pg-pool";
import { randomUUID } from "crypto";

export class EventoDataSourceImpl implements EventoDataSource {
    
    private pool = pgPool;

    async getAll(): Promise<Evento[]> {
       const res =  await this.pool.query('SELECT * FROM eventos');
       return res.rows;
    }
    async getById(id: string): Promise<Evento | null> {
        const res = await this.pool.query('SELECT * FROM eventos WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    async create(evento: Evento): Promise<Evento> {
        const id = randomUUID();
        const res = await this.pool.query(
            'INSERT INTO eventos (id, institucional, id_tipo_evento, nombre_evento, descripcion, id_responsable, id_aliado, id_sede, fecha_evento_desde, fecha_evento_hasta, programacion, estado, creado_por, fecha_creacion, modificado_por, fecha_modificacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *', [
            id,
            evento.institucional,
            evento.id_tipo_evento,
            evento.nombre_evento,
            evento.descripcion,
            evento.id_responsable,
            evento.id_aliado,
            evento.id_sede,
            evento.fecha_evento_desde,
            evento.fecha_evento_hasta,
            evento.programacion,
            evento.estado,
            evento.creado_por,
            evento.fecha_creacion,
            evento.modificado_por,
            evento.fecha_modificacion,
        ]);
        return res.rows[0];
    }
    async updateById(evento: Evento): Promise<Evento> {
        const res = await this.pool.query(
            'UPDATE eventos SET institucional = $2, id_tipo_evento = $3, nombre_evento = $4, descripcion = $5, id_responsable = $6, id_aliado = $7, id_sede = $8, fecha_evento_desde = $9, fecha_evento_hasta = $10, programacion = $11, estado = $12, creado_por = $13, fecha_creacion = $14, modificado_por = $15, fecha_modificacion = $16 WHERE id = $1 RETURNING *', [
            evento.id,
            evento.institucional,
            evento.id_tipo_evento,
            evento.nombre_evento,
            evento.descripcion,
            evento.id_responsable,
            evento.id_aliado,
            evento.id_sede,
            evento.fecha_evento_desde,
            evento.fecha_evento_hasta,
            evento.programacion,
            evento.estado,
            evento.creado_por,
            evento.fecha_creacion,
            evento.modificado_por,
            evento.fecha_modificacion,
        ]);
        return res.rows[0];
    }
    async delete(id: string): Promise<boolean> {
       await this.pool.query('DELETE FROM eventos WHERE id = $1', [id]);
       return true;
    }
}