import { ParametrosGenerales, ParametrosGeneralesDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { parametrosGeneralesQueries } from "../db/parametros-generales-queries";

export class ParametrosGeneralesDataSourceImpl implements ParametrosGeneralesDataSource {

    private pool = pgPool;

    async getAll(): Promise<ParametrosGenerales[]> {
        const res = await this.pool.query( parametrosGeneralesQueries.getAll );
        return res.rows;
    }

    async getById( id_parametro_general: string ): Promise<ParametrosGenerales | null> {
        const res = await this.pool.query( parametrosGeneralesQueries.getById, [id_parametro_general]);
        return res.rows[0] || null;
    }

    async create( parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales> {
   
        const values = [
            parametrosGenerales.nombre_parametro, 
            parametrosGenerales.descripcion, 
            parametrosGenerales.estado, 
        ];
        const result = await this.pool.query( parametrosGeneralesQueries.create, values);
        return result.rows[0];
    }

    async updateById( id_parametro_general: string, parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales> {
 
        const values = [
            id_parametro_general,
            parametrosGenerales.nombre_parametro,
            parametrosGenerales.descripcion,
            parametrosGenerales.estado,
        ];
        const result = await this.pool.query( parametrosGeneralesQueries.updateById, values);
        return result.rows[0];
    }

    async deleteById( id_parametro_general: string ): Promise<boolean> {
        await this.pool.query( parametrosGeneralesQueries.deleteById, [id_parametro_general] );
        return true;
    }
}