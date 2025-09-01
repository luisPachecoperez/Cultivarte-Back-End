import { pgPool } from "../db/pg-pool";
import { Poblacion,
         RespuestaGrap,
         PoblacionDataSource} from "../../domain";

import { poblacionesQueries } from "../db/poblaciones-queries";

export class PoblacionDataSourceImpl implements PoblacionDataSource {
    private pool = pgPool;
    
    async getPoblaciones(): Promise<Poblacion[] | RespuestaGrap> {
        try {
            const result = await this.pool.query( poblacionesQueries.poblacionesResult );
            return result.rows;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener poblaciones: ' + error
            };
        }
    }   
    
    async getPoblacionById(id_poblacion: string): Promise<Poblacion | RespuestaGrap> {
        try {
            const result = await this.pool.query( poblacionesQueries.poblacionesResult, [id_poblacion] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener poblacion por id: ' + error
            };
        }
    }

    async createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( poblacionesQueries.createPoblacion, [poblacion.id_poblacion, poblacion.nombre] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo crear poblacion: ' + error
            };
        }
    }       

    async updatePoblacionById(id_poblacion: string, poblacion: Poblacion): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( poblacionesQueries.updatePoblacion, [id_poblacion, poblacion.nombre] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo actualizar poblacion: ' + error
            };
        }
    }

    async deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query( poblacionesQueries.deletePoblacion, [id_poblacion] );
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo eliminar poblacion: ' + error
            };
        }
    }
}
