import { SesionAsistenteDataSource } from "../../domain";
import { SesionAsistente } from "../../domain";
import { pgPool } from "../db/pg-pool";

export class SesionAsistenteDataSourceImpl implements SesionAsistenteDataSource {
    
    private pool = pgPool;

    async getAll(): Promise<SesionAsistente[] | null> {
        const res = await this.pool.query( 'SELECT * FROM sesiones_asistentes' );
        return res.rows;
    }

    async getById( id_sesion_asistente: string ): Promise<SesionAsistente | null> {
        const res = await this.pool.query( 'SELECT * FROM sesiones_asistentes WHERE id_sesion_asistente = $1', [id_sesion_asistente] );
        return res.rows[0] || null;
    }

    async create( sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        const query = `
            INSERT INTO sesiones_asistentes (
            id_sesion_asistente, id_sesion, id_beneficiario, imagen, nro_asistentes, creado_por, fecha_creacion
            ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,NOW()
            ) RETURNING *`;
        const values = [
            sesionAsistente.id_sesion_asistente, sesionAsistente.id_sesion, sesionAsistente.id_beneficiario, sesionAsistente.imagen, sesionAsistente.nro_asistentes, sesionAsistente.creado_por
        ];
        const res = await this.pool.query( query, values );
        return res.rows[0];
    }

    async updateById( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        const query = `
            UPDATE sesiones_asistentes
            SET id_sesion = $2, id_beneficiario = $3, imagen = $4, nro_asistentes = $5, creado_por = $6, fecha_creacion = $7
            WHERE id_sesion_asistente = $1
            RETURNING *`;
        const values = [
            sesionAsistente.id_sesion_asistente, sesionAsistente.id_sesion, sesionAsistente.id_beneficiario, sesionAsistente.imagen, sesionAsistente.nro_asistentes, sesionAsistente.creado_por
        ];
        const res = await this.pool.query( query, values );
        return res.rows[0];
    }

    async deleteById( id_sesion_asistente: string ): Promise<boolean> {
       await this.pool.query( 'DELETE FROM sesiones_asistentes WHERE id_sesion_asistente = $1', [id_sesion_asistente] );
       return true;
    }
 
}
