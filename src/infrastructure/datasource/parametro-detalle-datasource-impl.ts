import { ParametroDetalle, ParametroDetalleDataSource, RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { parametrosGeneralesQueries } from "../db/parametros-generales-queries";

export class ParametroDetalleDataSourceImpl implements ParametroDetalleDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<ParametroDetalle[]> {
        const getAllRes = await this.pool.query( parametrosGeneralesQueries.getAll );
        return getAllRes.rows;
    }

    async getById( id_parametro_detalle: string ): Promise<ParametroDetalle | RespuestaGrap> {
        try {
            const getByIdRes = await this.pool.query( parametrosGeneralesQueries.getById, [id_parametro_detalle]);
            return getByIdRes.rows[0] || null;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener parametro detalle: ' + error };
        }
    }
    
    async create( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle | RespuestaGrap> {
        try {
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
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear parametro detalle: ' + error };
        }
    }

    async updateById( id_parametro_detalle: string, parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle | RespuestaGrap> {
        try {
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
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al actualizar parametro detalle: ' + error };
        }
    }  
        
    async deleteById( id_parametro_detalle: string ): Promise<RespuestaGrap> {
        try {
            await this.pool.query( parametrosGeneralesQueries.deleteById, [id_parametro_detalle] );
            return { exitoso: 'S', mensaje: 'Parametro detalle eliminado correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al eliminar parametro detalle: ' + error };
        }
    }
}