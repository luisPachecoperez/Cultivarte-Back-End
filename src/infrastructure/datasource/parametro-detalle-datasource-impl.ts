import { ParametroDetalle, ParametroDetalleDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { parametrosGeneralesQueries } from "../db/parametros-generales-queries";

export class ParametroDetalleDataSourceImpl implements ParametroDetalleDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<ParametroDetalle[]> {
        const getAllRes = await this.pool.query( parametrosGeneralesQueries.getAll );
        return getAllRes.rows;
    }

    async getById( id_parametro_detalle: string ): Promise<ParametroDetalle | null> {
        const getByIdRes = await this.pool.query( parametrosGeneralesQueries.getById, [id_parametro_detalle]);
        return getByIdRes.rows[0] || null;
    }
    
    async create( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle> {
        const values = [
            parametroDetalle.id_parametro_general,
            parametroDetalle.nombre,
            parametroDetalle.codigo,
            parametroDetalle.orden,
            parametroDetalle.valores,
            parametroDetalle.estado
        ];
        const result = await this.pool.query(parametrosGeneralesQueries.create, values);
        return result.rows[0];
    }

    async updateById( id_parametro_detalle: string, parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle> {
        const values = [
            id_parametro_detalle,
            parametroDetalle.nombre,
            parametroDetalle.codigo,
            parametroDetalle.orden,
            parametroDetalle.valores,
            parametroDetalle.estado,
        ];
        
        const result = await this.pool.query( parametrosGeneralesQueries.updateById, values );    
        return result.rows[0];
    }  
    
    async deleteById( id_parametro_detalle: string ): Promise<boolean> {
        await this.pool.query( parametrosGeneralesQueries.deleteById, [id_parametro_detalle] );
        return true;
    }
}