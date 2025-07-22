import { ParametrosGenerales, ParametrosGeneralesDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";

export class ParametrosGeneralesDataSourceImpl implements ParametrosGeneralesDataSource {

    private pool = pgPool;

    async getAll(): Promise<ParametrosGenerales[]> {
        const res = await this.pool.query( 'SELECT * FROM parametros_generales' );
        return res.rows;
    }

    async getById( id_parametro_general: string ): Promise<ParametrosGenerales | null> {
        const res = await this.pool.query( 'SELECT * FROM parametros_generales WHERE id_parametro_general = $1', [id_parametro_general]);
        return res.rows[0] || null;
    }

    async create( parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales> {
        const query = `
            INSERT INTO parametros_generales (
            nombre_parametro, descripcion, estado, creado_por, fecha_creacion
            ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,NOW()
            ) RETURNING *`;
        const values = [
            parametrosGenerales.nombre_parametro, parametrosGenerales.descripcion, parametrosGenerales.estado, parametrosGenerales.creado_por
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async updateById( id_parametro_general: string, parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales> {
        const query = `
            UPDATE parametros_generales SET nombre_parametro = $2, descripcion = $3, estado = $4, modificado_por = $5, fecha_modificacion = NOW() WHERE id_parametro_general = $1 RETURNING *`;
        const values = [
            id_parametro_general,
            parametrosGenerales.nombre_parametro,
            parametrosGenerales.descripcion,
            parametrosGenerales.estado,
            parametrosGenerales.modificado_por,
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async deleteById( id_parametro_general: string ): Promise<boolean> {
        await this.pool.query( 'DELETE FROM parametros_generales WHERE id_parametro_general = $1', [id_parametro_general] );
        return true;
    }
}