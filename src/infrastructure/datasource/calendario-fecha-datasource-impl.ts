import { CalendarioFechaDataSource,
         Evento,
         CalendarioInput,
         RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { calendarioQueries } from "../db/calendario-queries";

export class CalendarioFechaDataSourceImpl implements CalendarioFechaDataSource {
    
    private pool = pgPool;
    
    async getByDate(calendarioInput: CalendarioInput): Promise<Evento[] | RespuestaGrap> {
        try {
            const result = await this.pool.query( calendarioQueries.getByDate, [ calendarioInput.fecha_inicial, calendarioInput.fecha_final ] );
            return result.rows;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener eventos por fecha: ' + error };
        }
    }
}
