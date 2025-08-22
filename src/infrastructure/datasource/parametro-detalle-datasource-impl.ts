import { ParametroDetalle, ParametroDetalleDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";

export class ParametroDetalleDataSourceImpl implements ParametroDetalleDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<ParametroDetalle[]> {
        const res = await this.pool.query( `SELECT * FROM parametros_detalle` );
        return res.rows;
    }

    async getById( id_parametro_detalle: string ): Promise<ParametroDetalle | null> {
        const result = await this.pool.query( `SELECT * FROM parametros_detalle WHERE id_parametro_detalle = $1`, [id_parametro_detalle]);
        return result.rows[0] || null;
    }
    
    async create( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle> {
        const query = `INSERT INTO parametros_detalle (
            id_parametro_general, 
            nombre, 
            codigo, 
            orden, 
            valores,
            estado
            ) VALUES (
            $1,$2,$3,$4,$5,$6
        ) RETURNING *`;
        const values = [
            parametroDetalle.id_parametro_general, parametroDetalle.nombre, parametroDetalle.codigo, parametroDetalle.orden,
            parametroDetalle.valores, parametroDetalle.estado
        ];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async updateById( id_parametro_detalle: string, parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle> {
        const result = await this.pool.query(
           `UPDATE 
            parametros_detalle 
            SET nombre = $2, 
            codigo = $3, 
            orden = $4, 
            valores = $5, 
            estado = $6 
            WHERE id_parametro_detalle = $1 RETURNING *`, [
            id_parametro_detalle,
            parametroDetalle.nombre,
            parametroDetalle.codigo,
            parametroDetalle.orden,
            parametroDetalle.valores,
            parametroDetalle.estado,
        ]);
        return result.rows[0];
    }  
    
    async deleteById( id_parametro_detalle: string ): Promise<boolean> {
        await this.pool.query( 'DELETE FROM parametros_detalle WHERE id_parametro_detalle = $1', [id_parametro_detalle] );
        return true;
    }
}