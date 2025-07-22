import { SesionDataSource } from "../../domain";
import { Sesion } from "../../domain"
import { pgPool } from "../db/pg-pool";

export class SesionDataSourceImpl implements SesionDataSource {
    private pool = pgPool;

    async getAll(): Promise<Sesion[]> {
        const result = await this.pool.query( 'SELECT * FROM sesiones' );
        return result.rows;
    } 
    
    async getById( id_sesion: string ): Promise<Sesion | null> {
        const result = await this.pool.query( 'SELECT * FROM sesiones WHERE id_sesion = $1', [id_sesion] );
        return result.rows[0] || null;
    }

    async create( sesion: Sesion ): Promise<Sesion> {
        const query = `
        INSERT INTO sesiones (
          id_evento, desde, hasta,
          estado, creado_por, fecha_creacion
        ) VALUES (
          $1,$2,$3,$4,$5,NOW()
        ) RETURNING *
      `;
      const values = [
        sesion.id_evento,
        sesion.desde,
        sesion.hasta,
        sesion.estado,
        sesion.creado_por,
      ];
      const result = await this.pool.query( query, values );
      return result.rows[0];
    }

    async updateById( id_sesion: string, sesion: Sesion ): Promise<Sesion> {
        const fields = Object.keys(sesion);
        const values = Object.values(sesion);
    
        const set = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
        const result = await this.pool.query(
          `UPDATE sesiones SET ${set}, fecha_modificacion = NOW() WHERE id_sesion = $${fields.length + 1} RETURNING *`,
          [...values, id_sesion]
        );
        return result.rows[0];
    }

    async deleteById( id_sesion: string ): Promise<boolean> {
        await this.pool.query( 'DELETE FROM sesiones WHERE id_sesion = $1', [id_sesion] );
        return true;
    }
}